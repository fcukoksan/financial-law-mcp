import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { searchLaws, getEgovUrl } from '../lib/egov-client.js';
import { toolResult, toolCatchError } from '../lib/tool-helpers.js';

export function registerSearchLawTool(server: McpServer) {
  server.tool(
    'search_law',
    '法令をキーワードで検索する。法令名が分からない場合に使用。e-Gov法令API v2を使用。金融法令に限らず全法令を横断検索可能。',
    {
      keyword: z.string().describe(
        '検索キーワード。例: "金融商品取引", "暗号資産", "前払式支払手段", "インサイダー", "公開買付"'
      ),
      law_type: z.enum(['Act', 'CabinetOrder', 'MinisterialOrdinance']).optional().describe(
        '法令種別で絞り込み。Act=法律, CabinetOrder=政令（施行令）, MinisterialOrdinance=府省令（内閣府令等）'
      ),
      limit: z.number().optional().describe(
        '取得件数（デフォルト10、最大20）'
      ),
    },
    async (args) => {
      try {
        const limit = Math.min(args.limit ?? 10, 20);
        const results = await searchLaws(args.keyword, limit, args.law_type);

        if (results.length === 0) {
          return toolResult(`"${args.keyword}" に一致する法令が見つかりませんでした。`);
        }

        const lines = results.map((r, i) => {
          const info = r.law_info;
          return `${i + 1}. **${info.law_title}**\n   法令番号: ${info.law_num} | law_id: ${info.law_id} | 種別: ${info.law_type}\n   URL: ${getEgovUrl(info.law_id)}`;
        });

        return toolResult(
          `# 法令検索結果: "${args.keyword}"\n\n${lines.join('\n\n')}\n\n---\n出典：e-Gov法令検索（デジタル庁）`
        );
      } catch (error) {
        return toolCatchError(error);
      }
    }
  );
}
