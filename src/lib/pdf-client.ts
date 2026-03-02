/**
 * PDF取得・テキスト抽出
 *
 * 金融庁のPDF版ガイドライン・Q&Aからテキストを抽出する。
 * pdf-parse を使用。
 */

import { fsaContentCache } from './cache.js';

/**
 * URLからPDFを取得してテキストを抽出する
 */
export async function fetchPdfText(url: string): Promise<string> {
  // キャッシュチェック
  const cached = fsaContentCache.get(`pdf:${url}`);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`PDF取得エラー: ${res.status} ${res.statusText} (${url})`);
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('pdf') && !url.endsWith('.pdf')) {
    throw new Error(`PDFではありません: content-type=${contentType} (${url})`);
  }

  const buffer = await res.arrayBuffer();
  const uint8 = new Uint8Array(buffer);

  // pdf-parse (CJS module, dynamic import)
  const pdfParseModule = await import('pdf-parse');
  const pdfParse = ('default' in pdfParseModule ? pdfParseModule.default : pdfParseModule) as unknown as (buffer: Buffer) => Promise<{ text: string }>;
  const data = await pdfParse(Buffer.from(uint8));

  const text = data.text?.trim() ?? '';

  if (!text) {
    throw new Error('PDFからテキストを抽出できませんでした（スキャン画像PDFの可能性があります）');
  }

  // キャッシュに保存
  fsaContentCache.set(`pdf:${url}`, text);

  return text;
}
