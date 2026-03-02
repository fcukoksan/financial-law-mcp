/**
 * 金融庁ガイドライン・監督指針レジストリ
 *
 * 金融庁サイト (https://www.fsa.go.jp/) のガイドライン・監督指針のURLをマッピング。
 * PDF版とHTML版がある場合はHTML版を優先（テキスト抽出が容易なため）。
 */

import type { LawDomain } from './law-registry.js';

export type GuidelineType = 'guideline' | 'supervisory' | 'jimu' | 'qa';

export interface GuidelineEntry {
  /** ガイドライン正式名称 */
  name: string;
  /** URL（HTML版を優先、なければPDF） */
  url: string;
  /** PDF URL（HTML版がない場合や、PDF直指定が必要な場合） */
  pdfUrl?: string;
  /** 形式 */
  format: 'html' | 'pdf';
  /** ガイドラインの種類 */
  type: GuidelineType;
  /** 関連ドメイン（law-registryのLawDomainと共通） */
  domain: LawDomain;
}

// ============================================================
// ガイドラインレジストリ
// ============================================================

export const GUIDELINE_REGISTRY: Record<string, GuidelineEntry> = {
  // ============================
  // 金商法系ガイドライン
  // ============================
  '金商法等ガイドライン': {
    name: '金融商品取引法等に関する留意事項について（金融商品取引法等ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kinshouhou.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kinsho',
  },
  '開示ガイドライン': {
    name: '企業内容等の開示に関する留意事項について（企業内容等開示ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/260220_kaiji.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kinsho',
  },
  'FDルールガイドライン': {
    name: '金融商品取引法第27条の36の規定に関する留意事項について（フェア・ディスクロージャー・ルールガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/20180206-2.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kinsho',
  },
  '財規ガイドライン': {
    name: '「財務諸表等の用語、様式及び作成方法に関する規則」の取扱いに関する留意事項について（財務諸表等規則ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/zaiki.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kaikei',
  },
  '連結財規ガイドライン': {
    name: '「連結財務諸表の用語、様式及び作成方法に関する規則」の取扱いに関する留意事項について（連結財務諸表規則ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/renketuzaiki.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kaikei',
  },

  // ============================
  // 監督指針（HTML版あり）
  // ============================
  '金商業者等監督指針': {
    name: '金融商品取引業者等向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/kinyushohin/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/kinyushohin.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '主要行等監督指針': {
    name: '主要行等向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/city/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'ginko',
  },
  '中小地域金融機関監督指針': {
    name: '中小・地域金融機関向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/chusho/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'ginko',
  },
  '保険会社監督指針': {
    name: '保険会社向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/ins/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'hoken',
  },
  '貸金業者監督指針': {
    name: '貸金業者向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/kashikin/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'kashikin',
  },
  '信託会社等監督指針': {
    name: '信託会社等に関する総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/shintaku/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'shintaku',
  },
  '少額短期保険業者監督指針': {
    name: '少額短期保険業者向けの監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/syougaku/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/syougaku.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'hoken',
  },
  '認可特定保険業者監督指針': {
    name: '認可特定保険業者向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/ninka/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/ninka_a.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'hoken',
  },
  '信用格付業者監督指針': {
    name: '信用格付業者向けの監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/kakuduke/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/kakuduke/kakuduke.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '高速取引行為者監督指針': {
    name: '高速取引行為者向けの監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/hft/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/hft/hft.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '投資運用受託業者監督指針': {
    name: '投資運用関係業務受託業者向けの監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/im-rs/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/im-rs/im-rs.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '金融サービス仲介業者監督指針': {
    name: '金融サービス仲介業者向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/kinsa/index.html',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '信用保証協会監督指針': {
    name: '信用保証協会向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/hosyokyokai/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/hoshokyokai.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'ginko',
  },
  '清算振替機関監督指針': {
    name: '清算・振替機関等向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/seisan/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/seisan/seisan.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },
  '為替取引分析業者監督指針': {
    name: '為替取引分析業者向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/ftta/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/ftta.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'shikin',
  },
  '指定紛争解決機関監督指針': {
    name: '指定紛争解決機関向けの総合的な監督指針',
    url: 'https://www.fsa.go.jp/common/law/guide/kinyuadr/index.html',
    pdfUrl: 'https://www.fsa.go.jp/common/law/guide/kinyuadr.pdf',
    format: 'html',
    type: 'supervisory',
    domain: 'kinsho',
  },

  // ============================
  // 事務ガイドライン（第三分冊：金融会社関係）
  // ============================
  '事務ガイドライン（金融会社）': {
    name: '事務ガイドライン（第三分冊：金融会社関係）',
    url: 'https://www.fsa.go.jp/common/law/guide/kaisya/index.html',
    format: 'html',
    type: 'jimu',
    domain: 'kinsho',
  },

  // ============================
  // Q&A
  // ============================
  '定義Q&A': {
    name: '金融商品取引法第２条に規定する定義に関するQ&A',
    url: 'https://www.fsa.go.jp/news/28/sonota/20161226-2/01.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '金商業等Q&A': {
    name: '金融商品取引業等に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/20251031.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  'インサイダーQ&A': {
    name: 'インサイダー取引規制に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/insider_qa_.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '情報伝達Q&A': {
    name: '情報伝達・取引推奨規制に関するQ&A',
    url: 'https://www.fsa.go.jp/news/25/syouken/20130912-1/01.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '暗号資産Q&A': {
    name: '自己資本規制告示における暗号資産の取扱いに関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/angoushisan-qanda.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '保険業該当性Q&A': {
    name: '保険業該当性に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/hokenngaitouseiqanda.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'hoken',
  },
  '貸金業法Q&A': {
    name: '貸金業法に関するQ&A',
    url: 'https://www.fsa.go.jp/policy/kashikin/qa.html',
    format: 'html',
    type: 'qa',
    domain: 'kashikin',
  },
};

// ============================================================
// 略称マッピング
// ============================================================

export const GUIDELINE_ALIAS: Record<string, string> = {
  // ガイドライン
  '金商ガイドライン': '金商法等ガイドライン',
  '金商GL': '金商法等ガイドライン',
  '開示GL': '開示ガイドライン',
  'FDGL': 'FDルールガイドライン',
  'フェアディスクロージャー': 'FDルールガイドライン',
  '財規GL': '財規ガイドライン',
  '連結財規GL': '連結財規ガイドライン',

  // 監督指針
  '金商監督指針': '金商業者等監督指針',
  '業者等監督指針': '金商業者等監督指針',
  '主要行監督指針': '主要行等監督指針',
  '銀行監督指針': '主要行等監督指針',
  '中小監督指針': '中小地域金融機関監督指針',
  '保険監督指針': '保険会社監督指針',
  '貸金監督指針': '貸金業者監督指針',
  '信託監督指針': '信託会社等監督指針',
  '少額短期保険監督指針': '少額短期保険業者監督指針',
  '少短監督指針': '少額短期保険業者監督指針',
  '格付業者監督指針': '信用格付業者監督指針',
  'HFT監督指針': '高速取引行為者監督指針',
  '金融サービス仲介監督指針': '金融サービス仲介業者監督指針',
  'FS仲介監督指針': '金融サービス仲介業者監督指針',
  '信用保証協会監督': '信用保証協会監督指針',
  '清算機関監督指針': '清算振替機関監督指針',
  '為替分析業者監督指針': '為替取引分析業者監督指針',
  'ADR監督指針': '指定紛争解決機関監督指針',

  // 事務ガイドライン
  '事務GL': '事務ガイドライン（金融会社）',
  '金融会社事務GL': '事務ガイドライン（金融会社）',

  // Q&A
  '定義QA': '定義Q&A',
  '金商定義QA': '定義Q&A',
  '業等QA': '金商業等Q&A',
  '金商業QA': '金商業等Q&A',
  'インサイダーQA': 'インサイダーQ&A',
  '情報伝達QA': '情報伝達Q&A',
  '暗号資産QA': '暗号資産Q&A',
  'cryptoQA': '暗号資産Q&A',
  '保険業該当性QA': '保険業該当性Q&A',
  '保険QA': '保険業該当性Q&A',
  '貸金QA': '貸金業法Q&A',
  '貸金業QA': '貸金業法Q&A',
};

// ============================================================
// ユーティリティ
// ============================================================

/**
 * ガイドライン名を正規化してエントリを返す
 */
export function resolveGuidelineName(input: string): {
  name: string;
  entry: GuidelineEntry | null;
} {
  const alias = GUIDELINE_ALIAS[input];
  const key = alias ?? input;
  const entry = GUIDELINE_REGISTRY[key] ?? null;
  return {
    name: entry?.name ?? key,
    entry,
  };
}

/**
 * 対応ガイドライン一覧
 */
export function listSupportedGuidelines(): GuidelineEntry[] {
  return Object.values(GUIDELINE_REGISTRY);
}

/** ガイドライン種別の日本語ラベル */
export const GUIDELINE_TYPE_LABELS: Record<GuidelineType, string> = {
  guideline: 'ガイドライン（留意事項）',
  supervisory: '監督指針',
  jimu: '事務ガイドライン',
  qa: 'Q&A',
};
