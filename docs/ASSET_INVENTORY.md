# 媒体与生成资产盘点

核验日期：2026-08-31

## 结论

- `pages/` 原先约 300 MB，原因是生成器把约 2.1 MB 的共享旧应用完整复制了 148 次。现在 148 个 URL 保持不变：源码目录只保留约 83KB 的本地兼容入口，生产构建中的同名页面直接加载一套共享 React 资源，不再跳回首页或复制应用代码。
- `audio/` 共 356 个文件：346 个 TXT、3 个 Markdown、1 个 JSON 和 6 个 MP3。文本用于历史讲稿与审校；没有任何生产音频 URL 被配置。
- 6 个 MP3 全部位于 `audio/v13_partial/`，合计 1,451,364 字节，只是 v13 的不完整历史样本。没有外部对象存储与恢复验证前暂不删除。
- 仓库使用 `blob:none` 部分克隆；本地 `.git` 的体积包含历史生成页与历史音频对象，工作树瘦身不会改写公共 Git 历史。若未来需要清理历史，必须单独规划镜像备份、协作者迁移和强制推送窗口。

## 归档音频校验值

| 文件 | 字节 | SHA-256 |
| --- | ---: | --- |
| `audio/v13_partial/NT01_explain.mp3` | 256,006 | `4dad4c66fa0a3c4f059886fccacd43143bcf5b3f2080d3f9d455256299885822` |
| `audio/v13_partial/NT13_explain.mp3` | 277,318 | `e2bd1caff4529aef3f19f733b05c011f8f90ad7bd46f10ad6e1799c6d073f61e` |
| `audio/v13_partial/NT14_explain.mp3` | 198,406 | `c4f1bdc875e02809a7581b52e539a7ac239a1524f21a79d84bc68eaed6d07c8f` |
| `audio/v13_partial/NT15_explain.mp3` | 298,630 | `e7f2c7c873ad617c0e63cdf2f8bec42b8704ad1e77012df96811ecb199ebd5ed` |
| `audio/v13_partial/NT16_explain.mp3` | 217,414 | `bbb830b848711b20c57fc9333615cadb82906a967c680ff5c686b84d6ef193f9` |
| `audio/v13_partial/NT17_explain.mp3` | 203,590 | `6ebed64755e3bc32774eea12200cbca7f3e5fbbed3eeb9dee72fef96b2119d13` |

## 恢复与后续决策

1. 源码兼容入口可由 `python3 gen_pages.py` 从 `experiments_meta.json` 确定性重建；生产独立页由 `scripts/generate-experiment-pages.mjs` 在 Vite 构建后生成。
2. 旧版完整互动仍由 `dist/legacy.html#实验ID` 承载，148 页回归直接验证共享旧壳；新的 `/pages/{ID}.html` 由独立路由测试覆盖。
3. 音频恢复前需确定对象存储/CDN、公开访问许可、文件命名与内容版本；随后生成带哈希和时长的媒体清单，而不是把 URL 散落在 148 个对象中。
4. Git 历史清理不与普通功能提交混做；必须先建立裸镜像备份并明确通知所有协作者重新克隆。
