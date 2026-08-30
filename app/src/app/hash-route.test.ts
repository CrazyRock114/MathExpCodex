import { describe, expect, it } from 'vitest';
import { parseHashRoute } from './hash-route';

describe('Hash 路由', () => {
  it('解析实验详情地址', () => {
    expect(parseHashRoute('#/experiment/PR01')).toEqual({
      name: 'experiment',
      experimentId: 'PR01'
    });
  });

  it('兼容旧版根入口的 #实验ID 地址', () => {
    expect(parseHashRoute('#NT06')).toEqual({
      name: 'experiment',
      experimentId: 'NT06'
    });
  });

  it('对未知或空地址回到目录', () => {
    expect(parseHashRoute('')).toEqual({ name: 'catalog' });
    expect(parseHashRoute('#/unknown')).toEqual({ name: 'catalog' });
  });
});
