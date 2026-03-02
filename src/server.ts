import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGetLawTool } from './tools/get-law.js';
import { registerSearchLawTool } from './tools/search-law.js';
import { registerListLawsTool } from './tools/list-laws.js';
import { registerGetGuidelineTool } from './tools/get-guideline.js';
import { registerListGuidelinesTool } from './tools/list-guidelines.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'financial-law-mcp',
    version: '0.2.0',
  });

  // === Phase 1: 法令ツール（e-Gov API v2） ===
  registerGetLawTool(server);          // get_law: 条文取得
  registerSearchLawTool(server);       // search_law: 法令キーワード検索
  registerListLawsTool(server);        // list_laws: 対応法令一覧

  // === Phase 2: 金融庁ガイドライン・監督指針 ===
  registerGetGuidelineTool(server);    // get_guideline: ガイドライン取得
  registerListGuidelinesTool(server);  // list_guidelines: ガイドライン一覧

  return server;
}
