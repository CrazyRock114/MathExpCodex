import { describe, expect, it } from 'vitest';
import {
  catalogHref,
  experimentIdFromLegacyHash,
  legacyExperimentHref,
  parseAppRoute
} from './app-route';

describe('应用路由', () => {
  it('从独立页面路径解析实验', () => {
    expect(parseAppRoute('/dist/pages/PR01.html')).toEqual({
      name: 'experiment',
      experimentId: 'PR01'
    });
  });

  it('兼容旧版 Hash 地址', () => {
    expect(experimentIdFromLegacyHash('#/experiment/PR01')).toBe('PR01');
    expect(experimentIdFromLegacyHash('#NT06')).toBe('NT06');
    expect(parseAppRoute('/dist/index.html', '#NT06')).toEqual({
      name: 'experiment',
      experimentId: 'NT06'
    });
  });

  it('为目录和旧版对照生成正确的相对地址', () => {
    expect(catalogHref('/dist/pages/PR01.html')).toBe('../index.html');
    expect(catalogHref('/dist/index.html')).toBe('./index.html');
    expect(legacyExperimentHref('PR01', '/dist/pages/PR01.html')).toBe('../legacy.html#PR01');
  });

  it('对未知或空路径回到目录', () => {
    expect(parseAppRoute('/dist/index.html')).toEqual({ name: 'catalog' });
    expect(parseAppRoute('/dist/unknown.html', '#/unknown')).toEqual({ name: 'catalog' });
  });
});
