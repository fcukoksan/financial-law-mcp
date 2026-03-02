/**
 * 金融法令の law_id マッピング
 *
 * e-Gov法令検索 (https://laws.e-gov.go.jp/) のURLから law_id を取得。
 * ドメインごとにグループ化し、段階的に拡張可能な構造。
 *
 * 元リポジトリ: kentaroajisaka/tax-law-mcp (MIT)
 * 法令ID体系: https://laws.e-gov.go.jp/docs/law-data-basic/607318a-lawtypes-and-lawid/
 */

// ============================================================
// ドメイン定義
// ============================================================

export type LawDomain =
  | 'kinsho'     // 金商法系
  | 'shikin'     // 資金決済法系
  | 'ginko'      // 銀行法系
  | 'kashikin'   // 貸金業法系
  | 'hoken'      // 保険業法系
  | 'shintaku'   // 信託法・信託業法系
  | 'hanshuu'    // 犯収法・出資法等
  | 'kaikei'     // 財規・連結財規等
  | 'kappu'      // 割賦販売法系
  ;

export interface LawEntry {
  lawId: string;
  domain: LawDomain;
  /** 法令種別: Act / CabinetOrder / MinisterialOrdinance */
  lawType: 'Act' | 'CabinetOrder' | 'MinisterialOrdinance';
}

// ============================================================
// 法令名 → e-Gov law_id マッピング
// ============================================================

export const LAW_ID_MAP: Record<string, LawEntry> = {
  // ============================
  // 金商法系 (kinsho)
  // ============================
  '金融商品取引法': {
    lawId: '323AC0000000025',
    domain: 'kinsho',
    lawType: 'Act',
  },
  '金融商品取引法施行令': {
    lawId: '340CO0000000321',
    domain: 'kinsho',
    lawType: 'CabinetOrder',
  },
  '金融商品取引業等に関する内閣府令': {
    lawId: '419M60000002052',
    domain: 'kinsho',
    lawType: 'MinisterialOrdinance',
  },
  '企業内容等の開示に関する内閣府令': {
    lawId: '348M50000040005',
    domain: 'kinsho',
    lawType: 'MinisterialOrdinance',
  },
  '有価証券の取引等の規制に関する内閣府令': {
    lawId: '419M60000002059',
    domain: 'kinsho',
    lawType: 'MinisterialOrdinance',
  },

  // ============================
  // 会計規則 (kaikei)
  // ============================
  '財務諸表等の用語、様式及び作成方法に関する規則': {
    lawId: '338M50000040059',
    domain: 'kaikei',
    lawType: 'MinisterialOrdinance',
  },
  '連結財務諸表の用語、様式及び作成方法に関する規則': {
    lawId: '351M50000040028',
    domain: 'kaikei',
    lawType: 'MinisterialOrdinance',
  },

  // ============================
  // 資金決済法系 (shikin)
  // ============================
  '資金決済に関する法律': {
    lawId: '421AC0000000059',
    domain: 'shikin',
    lawType: 'Act',
  },
  '資金決済に関する法律施行令': {
    lawId: '422CO0000000019',
    domain: 'shikin',
    lawType: 'CabinetOrder',
  },

  // ============================
  // 銀行法系 (ginko)
  // ============================
  '銀行法': {
    lawId: '356AC0000000059',
    domain: 'ginko',
    lawType: 'Act',
  },
  '銀行法施行令': {
    lawId: '357CO0000000040',
    domain: 'ginko',
    lawType: 'CabinetOrder',
  },

  // ============================
  // 貸金業法系 (kashikin)
  // ============================
  '貸金業法': {
    lawId: '358AC1000000032',
    domain: 'kashikin',
    lawType: 'Act',
  },
  '貸金業法施行令': {
    lawId: '358CO0000000181',
    domain: 'kashikin',
    lawType: 'CabinetOrder',
  },

  // ============================
  // 保険業法系 (hoken)
  // ============================
  '保険業法': {
    lawId: '407AC0000000105',
    domain: 'hoken',
    lawType: 'Act',
  },
  '保険業法施行令': {
    lawId: '407CO0000000425',
    domain: 'hoken',
    lawType: 'CabinetOrder',
  },

  // ============================
  // 信託法・信託業法系 (shintaku)
  // ============================
  '信託法': {
    lawId: '418AC0000000108',
    domain: 'shintaku',
    lawType: 'Act',
  },
  '信託業法': {
    lawId: '416AC0000000154',
    domain: 'shintaku',
    lawType: 'Act',
  },

  // ============================
  // 犯収法・出資法等 (hanshuu)
  // ============================
  '犯罪による収益の移転防止に関する法律': {
    lawId: '419AC0000000022',
    domain: 'hanshuu',
    lawType: 'Act',
  },
  '出資の受入れ、預り金及び金利等の取締りに関する法律': {
    lawId: '329AC0000000195',
    domain: 'hanshuu',
    lawType: 'Act',
  },

  // ============================
  // 割賦販売法系 (kappu)
  // ============================
  '割賦販売法': {
    lawId: '336AC0000000159',
    domain: 'kappu',
    lawType: 'Act',
  },
};

// ============================================================
// 略称 → 正式名称
// ============================================================

export const LAW_ALIAS_MAP: Record<string, string> = {
  // 金商法系
  '金商法': '金融商品取引法',
  '金取法': '金融商品取引法',
  '金商令': '金融商品取引法施行令',
  '業府令': '金融商品取引業等に関する内閣府令',
  '業等府令': '金融商品取引業等に関する内閣府令',
  '開示府令': '企業内容等の開示に関する内閣府令',
  '取引規制府令': '有価証券の取引等の規制に関する内閣府令',

  // 会計規則
  '財規': '財務諸表等の用語、様式及び作成方法に関する規則',
  '財務諸表等規則': '財務諸表等の用語、様式及び作成方法に関する規則',
  '連結財規': '連結財務諸表の用語、様式及び作成方法に関する規則',
  '連結財務諸表規則': '連結財務諸表の用語、様式及び作成方法に関する規則',

  // 資金決済法系
  '資決法': '資金決済に関する法律',
  '資金決済法': '資金決済に関する法律',
  '資決令': '資金決済に関する法律施行令',

  // 銀行法系
  '銀法': '銀行法',
  '銀行令': '銀行法施行令',

  // 貸金業法系
  '貸金法': '貸金業法',
  '貸金令': '貸金業法施行令',

  // 保険業法系
  '保業法': '保険業法',
  '保険法': '保険業法',
  '保業令': '保険業法施行令',

  // 信託法・信託業法系
  '信託業': '信託業法',

  // 犯収法・出資法等
  '犯収法': '犯罪による収益の移転防止に関する法律',
  '犯罪収益移転防止法': '犯罪による収益の移転防止に関する法律',
  '出資法': '出資の受入れ、預り金及び金利等の取締りに関する法律',

  // 割賦販売法系
  '割販法': '割賦販売法',
};

// ============================================================
// ユーティリティ
// ============================================================

/**
 * 法令名を正規化する
 * 略称 → 正式名称に変換し、law_id を返す
 */
export function resolveLawName(input: string): {
  name: string;
  lawId: string | null;
  domain: LawDomain | null;
} {
  const alias = LAW_ALIAS_MAP[input];
  const normalizedName = alias ?? input;

  const entry = LAW_ID_MAP[normalizedName] ?? null;

  return {
    name: normalizedName,
    lawId: entry?.lawId ?? null,
    domain: entry?.domain ?? null,
  };
}

/**
 * 対応法令一覧をドメイン別に返す
 */
export function listSupportedLaws(): Record<LawDomain, string[]> {
  const result: Record<string, string[]> = {};
  for (const [name, entry] of Object.entries(LAW_ID_MAP)) {
    if (!result[entry.domain]) {
      result[entry.domain] = [];
    }
    result[entry.domain].push(name);
  }
  return result as Record<LawDomain, string[]>;
}

/**
 * 略称一覧を返す
 */
export function listAliases(): Record<string, string> {
  return { ...LAW_ALIAS_MAP };
}

/** ドメインの日本語ラベル */
export const DOMAIN_LABELS: Record<LawDomain, string> = {
  kinsho: '金融商品取引法関連',
  shikin: '資金決済法関連',
  ginko: '銀行法関連',
  kashikin: '貸金業法関連',
  hoken: '保険業法関連',
  shintaku: '信託法・信託業法関連',
  hanshuu: '犯収法・出資法等',
  kaikei: '会計規則（財規・連結財規）',
  kappu: '割賦販売法関連',
};
