import { describe, it, expect } from 'vitest';
import {
  resolveGuidelineName,
  listSupportedGuidelines,
  GUIDELINE_REGISTRY,
  GUIDELINE_ALIAS,
} from '../src/lib/fsa-registry.js';

describe('fsa-registry', () => {
  describe('resolveGuidelineName', () => {
    it('正式キーでエントリが解決できる', () => {
      const result = resolveGuidelineName('金商法等ガイドライン');
      expect(result.entry).not.toBeNull();
      expect(result.entry!.format).toBe('pdf');
    });

    it('略称でエントリが解決できる', () => {
      const result = resolveGuidelineName('金商GL');
      expect(result.entry).not.toBeNull();
      expect(result.name).toContain('金融商品取引法等');
    });

    it('金商監督指針の略称が解決できる', () => {
      const result = resolveGuidelineName('金商監督指針');
      expect(result.entry).not.toBeNull();
      expect(result.entry!.type).toBe('supervisory');
      expect(result.entry!.format).toBe('html');
    });

    it('保険監督指針の略称が解決できる', () => {
      const result = resolveGuidelineName('保険監督指針');
      expect(result.entry).not.toBeNull();
      expect(result.entry!.domain).toBe('hoken');
    });

    it('未登録名はnullエントリを返す', () => {
      const result = resolveGuidelineName('存在しないガイドライン');
      expect(result.entry).toBeNull();
    });
  });

  describe('listSupportedGuidelines', () => {
    it('エントリが返される', () => {
      const list = listSupportedGuidelines();
      expect(list.length).toBeGreaterThan(0);
    });

    it('監督指針が含まれる', () => {
      const list = listSupportedGuidelines();
      const supervisory = list.filter(e => e.type === 'supervisory');
      expect(supervisory.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('全略称が有効なキーを指す', () => {
    for (const [alias, target] of Object.entries(GUIDELINE_ALIAS)) {
      it(`${alias} → ${target}`, () => {
        expect(GUIDELINE_REGISTRY[target]).toBeDefined();
      });
    }
  });

  describe('全URLがhttps://www.fsa.go.jpで始まる', () => {
    for (const [key, entry] of Object.entries(GUIDELINE_REGISTRY)) {
      it(`${key}`, () => {
        expect(entry.url).toMatch(/^https:\/\/www\.fsa\.go\.jp\//);
      });
    }
  });
});
