import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listSupportedGuidelines, GUIDELINE_TYPE_LABELS, GUIDELINE_ALIAS } from '../lib/fsa-registry.js';
import type { GuidelineType } from '../lib/fsa-registry.js';
import { toolResult } from '../lib/tool-helpers.js';

export function registerListGuidelinesTool(server: McpServer) {
  server.tool(
    'list_guidelines',
    '対応している金融庁ガイドライン・監督指針の一覧を表示する。種別で絞り込み可能。',
    {
      type: z.enum(['guideline', 'supervisory', 'jimu', 'qa', 'all']).optional().describe(
        '種別で絞り込み。guideline=ガイドライン（留意事項）, supervisory=監督指針, jimu=事務ガイドライン, qa=Q&A, all=全て'
      ),
      show_aliases: z.boolean().optional().describe(
        'trueの場合、略称→正式名称の対応表も表示する'
      ),
    },
    async (args) => {
      const entries = listSupportedGuidelines();
      const filterType = args.type && args.type !== 'all' ? args.type as GuidelineType : null;
      const filtered = filterType ? entries.filter(e => e.type === filterType) : entries;

      const lines: string[] = ['# 対応ガイドライン・監督指針一覧\n'];

      // 種別ごとにグループ化
      const byType: Record<string, typeof entries> = {};
      for (const entry of filtered) {
        if (!byType[entry.type]) byType[entry.type] = [];
        byType[entry.type].push(entry);
      }

      for (const [type, items] of Object.entries(byType)) {
        lines.push(`## ${GUIDELINE_TYPE_LABELS[type as GuidelineType] ?? type}`);
        for (const item of items) {
          lines.push(`- **${item.name}** [${item.format.toUpperCase()}]`);
          lines.push(`  URL: ${item.url}`);
        }
        lines.push('');
      }

      if (args.show_aliases) {
        lines.push('## 略称一覧\n');
        lines.push('| 略称 | 対象 |');
        lines.push('|------|------|');
        for (const [alias, target] of Object.entries(GUIDELINE_ALIAS)) {
          lines.push(`| ${alias} | ${target} |`);
        }
      }

      return toolResult(lines.join('\n'));
    }
  );
}
