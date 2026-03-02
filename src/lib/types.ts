/** e-Gov API v2 のレスポンス型 */

export interface EgovLawSearchResult {
  law_info: {
    law_id: string;
    law_type: string;
    law_num: string;
    promulgation_date: string;
  };
  /** 最新改正版の情報（法令名はここに入る） */
  revision_info: {
    law_title: string;
    law_num?: string;
  };
  current_revision_info?: {
    law_title: string;
  };
}

export interface EgovLawData {
  law_info: {
    law_id: string;
    law_type: string;
    law_num: string;
    law_num_era?: string;
    law_num_year?: number;
    law_num_type?: string;
    law_num_num?: string;
    promulgation_date: string;
  };
  law_full_text: EgovNode;
}

export interface EgovNode {
  tag: string;
  attr?: Record<string, string>;
  children?: (EgovNode | string)[];
}
