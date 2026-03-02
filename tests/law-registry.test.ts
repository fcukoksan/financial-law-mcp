import { describe, it, expect } from 'vitest';
import { resolveLawName, listSupportedLaws, LAW_ID_MAP, LAW_ALIAS_MAP } from '../src/lib/law-registry.js';

describe('law-registry', () => {
  describe('resolveLawName', () => {
    it('正式名称でlaw_idが解決できる', () => {
      const result = resolveLawName('金融商品取引法');
      expect(result.lawId).toBe('323AC0000000025');
      expect(result.domain).toBe('kinsho');
    });

    it('略称でlaw_idが解決できる', () => {
      const result = resolveLawName('金商法');
      expect(result.name).toBe('金融商品取引法');
      expect(result.lawId).toBe('323AC0000000025');
    });

    it('業府令の略称が解決できる', () => {
      const result = resolveLawName('業府令');
      expect(result.name).toBe('金融商品取引業等に関する内閣府令');
      expect(result.lawId).toBe('419M60000002052');
    });

    it('資金決済法の略称が解決できる', () => {
      const result = resolveLawName('資決法');
      expect(result.name).toBe('資金決済に関する法律');
      expect(result.lawId).toBe('421AC0000000059');
    });

    it('犯収法の略称が解決できる', () => {
      const result = resolveLawName('犯収法');
      expect(result.name).toBe('犯罪による収益の移転防止に関する法律');
      expect(result.lawId).toBe('419AC0000000022');
    });

    it('未登録の法令名はnullを返す', () => {
      const result = resolveLawName('存在しない法律');
      expect(result.lawId).toBeNull();
      expect(result.domain).toBeNull();
    });
  });

  describe('listSupportedLaws', () => {
    it('全ドメインが含まれる', () => {
      const laws = listSupportedLaws();
      expect(laws.kinsho).toBeDefined();
      expect(laws.shikin).toBeDefined();
      expect(laws.ginko).toBeDefined();
      expect(laws.kashikin).toBeDefined();
      expect(laws.hoken).toBeDefined();
      expect(laws.shintaku).toBeDefined();
    });

    it('金商法系に5法令が含まれる', () => {
      const laws = listSupportedLaws();
      expect(laws.kinsho.length).toBe(5);
    });
  });

  describe('全略称が有効な正式名称を指す', () => {
    for (const [alias, formal] of Object.entries(LAW_ALIAS_MAP)) {
      it(`${alias} → ${formal}`, () => {
        expect(LAW_ID_MAP[formal]).toBeDefined();
      });
    }
  });
});
