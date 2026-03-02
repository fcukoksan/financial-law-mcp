import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { resolveGuidelineName, GUIDELINE_REGISTRY, GUIDELINE_TYPE_LABELS } from '../lib/fsa-registry.js';
import { fetchFsaHtmlPage, searchInText } from '../lib/fsa-client.js';
import { fetchPdfText } from '../lib/pdf-client.js';
import { toolResult, toolError, toolCatchError } from '../lib/tool-helpers.js';

export function registerGetGuidelineTool(server: McpServer) {
  server.tool(
    'get_guideline',
    `金融庁のガイドライン・監督指針・Q&Aを取得する。

対応ガイドライン（略称→正式名称）:
  金商GL → 金融商品取引法等ガイドライン（PDF→テキスト抽出）
  開示GL → 企業内容等開示ガイドライン（PDF→テキスト抽出）
  FDGL → フェア・ディスクロージャー・ルールガイドライン（PDF→テキスト抽出）
  財規GL → 財務諸表等規則ガイドライン（PDF→テキスト抽出）
  金商監督指針 → 金融商品取引業者等向けの総合的な監督指針（HTML）
  主要行監督指針 → 主要行等向けの総合的な監督指針（HTML）
  保険監督指針 → 保険会社向けの総合的な監督指針（HTML）
  貸金監督指針 → 貸金業者向けの総合的な監督指針（HTML）
  信託監督指針 → 信託会社等に関する総合的な監督指針（HTML）
  定義QA → 金融商品取引法第２条に規定する定義に関するQ&A（PDF→テキスト抽出）
  インサイダーQA → インサイダー取引規制に関するQ&A（PDF→テキスト抽出）

HTML版・PDF版ともにセクション番号での検索に対応。`,
    {
      guideline_name: z.string().describe(
        'ガイドライン名または略称。例: "金商監督指針", "金商GL", "開示GL", "定義QA", "インサイダーQA"'
      ),
      section: z.string().optional().describe(
        'セクション番号やキーワードで検索。例: "III-2-3", "29－1", "問2", "Q2"。ガイドラインの特定箇所を取得する場合に指定。'
      ),
    },
    async (args) => {
      try {
        const { name, entry } = resolveGuidelineName(args.guideline_name);

        if (!entry) {
          const lines = Object.entries(GUIDELINE_REGISTRY).map(([key, e]) =>
            `- **${key}** — ${e.name} [${GUIDELINE_TYPE_LABELS[e.type]}] [${e.format.toUpperCase()}]`
          );
          return toolError(`"${args.guideline_name}" は見つかりませんでした。\n\n対応ガイドライン一覧:\n${lines.join('\n')}`);
        }

        const source = `\n\n---\n出典：金融庁\nURL: ${entry.url}`;

        // テキスト取得（PDF / HTML）
        let text: string;
        if (entry.format === 'pdf') {
          try {
            text = await fetchPdfText(entry.url);
          } catch (pdfError) {
            return toolError(`# ${name}\n\nPDFテキスト抽出に失敗しました: ${pdfError instanceof Error ? pdfError.message : String(pdfError)}\n\nPDF URL: ${entry.url}${source}`);
          }
        } else {
          text = await fetchFsaHtmlPage(entry.url);
        }

        // セクション検索
        if (args.section) {
          const found = searchInText(text, args.section, 30);
          if (found) {
            return toolResult(`# ${name}\n## 検索: "${args.section}"\n\n${found}${source}`);
          }
          return toolError(`${name} 内に "${args.section}" に該当する箇所が見つかりませんでした。\n\nURL: ${entry.url}`);
        }

        // 全文（トークン節約のため先頭3000文字）
        const maxLen = 3000;
        const truncated = text.length > maxLen
          ? text.substring(0, maxLen) + `\n\n... (以下省略。全文は ${text.length} 文字。section パラメータで特定箇所を指定してください)`
          : text;

        return toolResult(`# ${name}\n\n${truncated}${source}`);
      } catch (error) {
        return toolCatchError(error);
      }
    }
  );
}
