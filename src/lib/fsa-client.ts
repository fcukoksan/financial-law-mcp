/**
 * 金融庁ガイドライン取得クライアント
 *
 * HTML版の監督指針をフェッチしてテキスト抽出。
 * PDF版は直接テキスト抽出が難しいため、URLとメタデータを返す。
 */

import { fsaContentCache } from './cache.js';

/**
 * 金融庁のHTMLページを取得してテキストを抽出する
 */
export async function fetchFsaHtmlPage(url: string): Promise<string> {
  // キャッシュチェック
  const cached = fsaContentCache.get(url);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`金融庁サイト取得エラー: ${res.status} ${res.statusText} (${url})`);
  }

  const html = await res.text();
  const text = extractTextFromHtml(html);

  fsaContentCache.set(url, text);
  return text;
}

/**
 * HTMLからテキストを簡易抽出
 * 監督指針のHTML版は比較的シンプルな構造なので、タグ除去 + 整形で対応
 */
function extractTextFromHtml(html: string): string {
  // <body>内を抽出
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch?.[1] ?? html;

  let text = body;

  // scriptタグ・styleタグを除去
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  text = text.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

  // brタグを改行に変換
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // pタグ・divタグ・liタグの閉じタグを改行に変換
  text = text.replace(/<\/(p|div|li|tr|h[1-6])>/gi, '\n');

  // 残りのHTMLタグを除去
  text = text.replace(/<[^>]+>/g, '');

  // HTMLエンティティのデコード
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // 連続空白行を整理
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.trim();

  return text;
}

/**
 * テキストから特定の番号パターンを検索して前後を抽出
 * 監督指針の「III-2-3-1」のような番号を検索するケースに対応
 */
export function searchInText(text: string, query: string, contextLines: number = 10): string | null {
  const lines = text.split('\n');
  const queryLower = query.toLowerCase().replace(/[－\-]/g, '-').replace(/\s+/g, '');

  for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase().replace(/[－\-]/g, '-').replace(/\s+/g, '');
    if (lineLower.includes(queryLower)) {
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + contextLines);
      return lines.slice(start, end).join('\n');
    }
  }
  return null;
}
