import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { fetchLawData, getEgovUrl } from '../lib/egov-client.js';
import { extractArticle, extractToc } from '../lib/egov-parser.js';
import { toolResult, toolError, toolCatchError } from '../lib/tool-helpers.js';

export function registerGetLawTool(server: McpServer) {
  server.tool(
    'get_law',
    `日本の金融法令から特定の条文を取得する。e-Gov法令API v2を使用。

対応法令（略称→正式名称）:
  金商法→金融商品取引法, 金商令→金融商品取引法施行令,
  業府令→金融商品取引業等に関する内閣府令, 開示府令→企業内容等の開示に関する内閣府令,
  取引規制府令→有価証券の取引等の規制に関する内閣府令,
  財規→財務諸表等の用語、様式及び作成方法に関する規則,
  連結財規→連結財務諸表の用語、様式及び作成方法に関する規則,
  資金決済法/資決法→資金決済に関する法律, 銀行法/銀法,
  貸金法→貸金業法, 保業法→保険業法, 信託法, 信託業法,
  犯収法→犯罪による収益の移転防止に関する法律, 出資法, 割販法→割賦販売法
  
法令名またはlaw_id（e-Gov法令ID）で指定可能。`,
    {
      law_name: z.string().describe(
        '法令名、略称、またはe-Gov法令ID。例: "金融商品取引法", "金商法", "業府令", "資金決済法", "323AC0000000025"'
      ),
      article: z.string().describe(
        '条文番号。例: "2", "21の2", "27の2", "第2条"'
      ),
      paragraph: z.number().optional().describe(
        '項番号（省略時は条文全体）。例: 1, 2'
      ),
      item: z.number().optional().describe(
        '号番号（省略時は項全体）。例: 1, 2'
      ),
      format: z.enum(['markdown', 'toc']).optional().describe(
        '出力形式。"markdown"=条文全文（デフォルト）, "toc"=目次のみ（トークン節約）'
      ),
    },
    async (args) => {
      try {
        const { data, lawId, lawTitle } = await fetchLawData(args.law_name);
        const egovUrl = getEgovUrl(lawId);
        const source = `\n\n---\n出典：e-Gov法令検索（デジタル庁）\nURL: ${egovUrl}`;

        if (args.format === 'toc') {
          return toolResult(`# ${lawTitle} — 目次\n\n${extractToc(data)}${source}`);
        }

        const result = extractArticle(data, args.article, args.paragraph, args.item);

        if (!result) {
          const desc = `第${args.article}条${args.paragraph ? `第${args.paragraph}項` : ''}${args.item ? `第${args.item}号` : ''}`;
          return toolError(
            `${lawTitle} ${desc} が見つかりませんでした。\n\n条文番号を確認してください。"27の2" の場合は article: "27の2" と指定します。\n\nURL: ${egovUrl}`
          );
        }

        const articleDisplay = args.article.replace(/_/g, 'の');
        const paraDisplay = args.paragraph ? `第${args.paragraph}項` : '';
        const itemDisplay = args.item ? `第${args.item}号` : '';
        const caption = result.articleCaption ? `（${result.articleCaption}）\n` : '';

        return toolResult(
          `# ${lawTitle} 第${articleDisplay}条${paraDisplay}${itemDisplay}\n${caption}\n${result.text}${source}`
        );
      } catch (error) {
        return toolCatchError(error);
      }
    }
  );
}
