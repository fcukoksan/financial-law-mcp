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
    url: 'https://www.fsa.go.jp/common/law/kaiji/kaiji-guide.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kinsho',
  },
  'FDルールガイドライン': {
    name: '金融商品取引法第27条の36の規定に関する留意事項について（フェア・ディスクロージャー・ルールガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/fd-guideline.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kinsho',
  },
  '財規ガイドライン': {
    name: '「財務諸表等の用語、様式及び作成方法に関する規則」の取扱いに関する留意事項について（財務諸表等規則ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/zaimu-guide.pdf',
    format: 'pdf',
    type: 'guideline',
    domain: 'kaikei',
  },
  '連結財規ガイドライン': {
    name: '「連結財務諸表の用語、様式及び作成方法に関する規則」の取扱いに関する留意事項について（連結財務諸表規則ガイドライン）',
    url: 'https://www.fsa.go.jp/common/law/kaiji/renketsu-guide.pdf',
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
    url: 'https://www.fsa.go.jp/common/law/kokuji/teigi-qa.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '金商業等Q&A': {
    name: '金融商品取引業等に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/kokuji/kinshougyou-qa.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  'インサイダーQ&A': {
    name: 'インサイダー取引規制に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/kokuji/insider-qa.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '情報伝達Q&A': {
    name: '情報伝達・取引推奨規制に関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/kokuji/jouhou-qa.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
  },
  '暗号資産Q&A': {
    name: '自己資本規制告示における暗号資産の取扱いに関するQ&A',
    url: 'https://www.fsa.go.jp/common/law/kokuji/crypto-qa.pdf',
    format: 'pdf',
    type: 'qa',
    domain: 'kinsho',
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
