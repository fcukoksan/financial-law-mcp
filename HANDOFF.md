# financial-law-mcp 引き継ぎドキュメント

## プロジェクト概要

日本の金融法令・金融庁ガイドラインを取得するMCPサーバー。
kentaroajisaka/tax-law-mcp (MIT) をフォークし、金融法令特化に改変。

## リポジトリ

- ソース: `financial-law-mcp/` （tar.gzから展開済みの想定）
- 元リポジトリ: https://github.com/kentaroajisaka/tax-law-mcp

## 技術スタック

- TypeScript (ESM, target ES2022)
- @modelcontextprotocol/sdk
- zod (パラメータバリデーション)
- pdf-parse (PDFテキスト抽出)
- vitest (テスト)
- Vercel対応 (api/mcp.ts)

## ビルド・テスト

```bash
npm install
npx tsc          # ビルド (dist/)
npx vitest run   # テスト 83件
```

## ファイル構成

```
src/
├── index.ts              # エントリポイント (stdio transport)
├── server.ts             # MCPサーバー定義 (5ツール登録)
├── lib/
│   ├── cache.ts          # TTLCache汎用クラス + 3インスタンス
│   ├── egov-client.ts    # e-Gov法令API v2クライアント
│   ├── egov-parser.ts    # e-Gov JSONレスポンス→Markdownパーサー
│   ├── fsa-client.ts     # 金融庁HTMLページフェッチ+テキスト抽出
│   ├── fsa-registry.ts   # ガイドライン・監督指針URLレジストリ (17件+26略称)
│   ├── law-registry.ts   # 法令 law_id レジストリ (21法令+26略称)
│   ├── pdf-client.ts     # PDFフェッチ+テキスト抽出 (pdf-parse)
│   ├── tool-helpers.ts   # toolResult/toolError/toolCatchError
│   └── types.ts          # e-Gov API型定義
├── tools/
│   ├── get-law.ts        # get_law: 条文取得
│   ├── search-law.ts     # search_law: キーワード検索
│   ├── list-laws.ts      # list_laws: 対応法令一覧
│   ├── get-guideline.ts  # get_guideline: ガイドライン取得
│   └── list-guidelines.ts # list_guidelines: ガイドライン一覧
tests/
├── law-registry.test.ts  # 34テスト
└── fsa-registry.test.ts  # 49テスト
api/
└── mcp.ts                # Vercelサーバーレスハンドラ
```

## MCPツール一覧

| ツール | 説明 | ソース |
|--------|------|--------|
| `get_law` | e-Gov APIから条文取得。法令名+条番号指定 | e-Gov法令API v2 |
| `search_law` | キーワードで全法令横断検索 | e-Gov法令API v2 |
| `list_laws` | 対応法令・略称一覧 | ローカルレジストリ |
| `get_guideline` | ガイドライン・監督指針・Q&A取得。HTML版はセクション検索、PDF版はテキスト抽出 | 金融庁サイト |
| `list_guidelines` | 対応ガイドライン一覧 | ローカルレジストリ |

## 残タスク（優先順）

### 1. GitHubにpush
- [ ] `package.json` の `repository` URLをTFKのGitHubリポジトリに変更
- [ ] `git init && git add . && git commit`
- [ ] GitHub上にリポジトリ作成してpush

### 2. 実機テスト（Claude Code / Claude Desktop）
- [ ] Claude Desktop の `claude_desktop_config.json` に追加:
```json
{
  "mcpServers": {
    "financial-law": {
      "command": "node",
      "args": ["/path/to/financial-law-mcp/dist/index.js"]
    }
  }
}
```
- [ ] `get_law(law_name="金商法", article="2")` でe-Gov API疎通確認
- [ ] `get_guideline(guideline_name="金商監督指針")` で金融庁HTML取得確認
- [ ] `get_guideline(guideline_name="定義QA")` でPDFテキスト抽出確認
- [ ] `search_law(keyword="暗号資産")` で検索確認

### 3. npm publish（任意）
- [ ] npm アカウントでログイン
- [ ] `npm publish` → `npx financial-law-mcp` で使えるように

### 4. 将来拡張（需要に応じて）
- [ ] 金融庁Q&A追加（現在5件、まだPDFのURL特定が必要なものあり）
- [ ] 日証協自主規制規則
- [ ] 東証上場規程
- [ ] 金融庁パブコメ

## 設計判断の記録

- **レジストリを法令/ガイドラインで分離**: 型が根本的に違う（law_id vs URL+format）。無理に統合すると型安全性が下がる
- **MCPツールを5個に分離**: 統合ツールよりLLMの選択精度が上がる
- **PDF抽出はフォールバック付き**: 失敗時はURL案内に切り替え
- **監督指針はHTML版優先**: テキスト抽出が容易。PDF版URLも保持（pdfUrlフィールド）
- **キャッシュはTTL 1時間**: 法令・ガイドラインは頻繁に変わらないが、セッション跨ぎでは鮮度を保つ

## Q&AのPDF URL注意

fsa-registry.ts のQ&A URLは、金融庁サイトの構造から推測したもの。
実機テストで404が出た場合は、https://www.fsa.go.jp/common/law/kokuji.html から
正しいPDF URLを確認して修正する必要がある。
