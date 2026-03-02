import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listSupportedLaws, listAliases, DOMAIN_LABELS } from '../lib/law-registry.js';
import type { LawDomain } from '../lib/law-registry.js';
import { toolResult } from '../lib/tool-helpers.js';

export function registerListLawsTool(server: McpServer) {
  server.tool(
    'list_laws',
    'このMCPサーバーが対応している金融法令の一覧を表示する。ドメイン（分野）で絞り込み可能。略称の一覧も表示可能。',
    {
      domain: z.enum([
        'kinsho', 'shikin', 'ginko', 'kashikin', 'hoken',
        'shintaku', 'hanshuu', 'kaikei', 'kappu', 'all',
      ]).optional().describe(
        '表示するドメイン。省略時は全ドメイン。kinsho=金商法系, shikin=資金決済法系, ginko=銀行法系, kashikin=貸金業法系, hoken=保険業法系, shintaku=信託法系, hanshuu=犯収法等, kaikei=会計規則, kappu=割賦販売法系'
      ),
      show_aliases: z.boolean().optional().describe(
        'trueの場合、略称→正式名称の対応表も表示する'
      ),
    },
    async (args) => {
      const laws = listSupportedLaws();
      const lines: string[] = ['# 対応金融法令一覧\n'];

      const domains = args.domain && args.domain !== 'all'
        ? [args.domain as LawDomain]
        : (Object.keys(laws) as LawDomain[]);

      for (const domain of domains) {
        const label = DOMAIN_LABELS[domain] ?? domain;
        const names = laws[domain];
        if (!names || names.length === 0) continue;

        lines.push(`## ${label}`);
        for (const name of names) {
          lines.push(`- ${name}`);
        }
        lines.push('');
      }

      if (args.show_aliases) {
        const aliases = listAliases();
        lines.push('## 略称一覧\n');
        lines.push('| 略称 | 正式名称 |');
        lines.push('|------|----------|');
        for (const [alias, formal] of Object.entries(aliases)) {
          lines.push(`| ${alias} | ${formal} |`);
        }
      }

      return toolResult(lines.join('\n'));
    }
  );
}
