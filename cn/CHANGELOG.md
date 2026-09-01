# Echenterra 中文官网 UI/UX 优化报告

## 1. 当前设计最大的 10 个问题（按严重程度）

| 优先级 | 问题 |
|--------|------|
| Critical | 大量 ChenBridge 品牌残留（title / meta / 正文 / 聊天文案 / sitemap / robots / CSS 注释） |
| Critical | 铜色/青铜金属色体系过重，渐变与装饰性强，显得 artificial 而非 calm premium |
| High | Header 使用 heavy bronze 渐变 + 多重 drop-shadow，视觉噪音大 |
| High | Hover 动画过多（rotate 360°、rotateY、scale 1.1、图标旋转），干扰阅读 |
| High | coin-bg 装饰纹理 + 多层 radial-gradient，增加无用复杂度 |
| Medium | Hero 轮播在首屏前 5 秒可能稀释主信息（已保留但未强化噪音） |
| Medium | Logo 旁长 tagline 在手机端造成拥挤 |
| Medium | Section padding 与卡片阴影偏重，呼吸感不足 |
| Low | 部分页面仍引用历史 LinkedIn company/chenbridge（保留，因可能仍有效） |
| Low | 聊天 API 仍指向 api-cn.chenbridge.com（后端迁移中保留） |

## 2. 色彩是否重新调整

是。从纯青铜金属色（#B87333 / #8B5A2B / #3D2314）调整为更克制的暖色专业体系：

- Primary / Accent: #C4472A（与 theme-color 一致，清晰 CTA）
- Background: #FAF8F6 / #F3F0EC
- Text: #1F1A17 / #4A423C / #7A7168
- Hero / Header / Footer: 深暖中性 #1F1A17 → #2A221C，去掉铜色闪光渐变
- 删除 coin-bg 装饰图案

目标：Modern · Premium · Calm · Trustworthy，而非 Decorative Metallic。

## 3. Typography

- 保留 Noto Sans SC / 系统中文字体栈
- 统一 section-title / body / muted 层级与颜色 token
- 手机端 H2 降至 28px，section 内边距收紧，提升可读性
- 未增加新字体

## 4. Hero 是否修改

结构保留（轮播 + 双 CTA + canvas 背景）。仅：

- 背景改为更深、更安静的暖中性渐变
- 去掉过重的铜色中间停靠点
- 手机端轮播标题字号与最小高度优化

未重做文案与信息架构。

## 5. 删除的视觉元素

- Bronze metal header/footer 渐变覆盖层
- coin-bg 装饰纹理
- 图标 hover 的 360° / 3D 翻转 / 过度 scale
- logo-chenbridge.webp（未打包进交付物）
- 多余 CSS 硬编码铜色

## 6. 合并的元素

- 主色与 accent 统一为同一 CTA 色
- 阴影系统简化为两档（--shadow / --shadow-lg）
- Header 滚动状态从复杂渐变简化为纯色 + 轻阴影

## 7. 增加现代感的地方

- 更干净的深色顶栏与页脚
- 更克制的卡片 hover（仅轻微上移 + 阴影）
- 清晰的 CTA 色对比
- 减少“为了高级而装饰”的金属语言

## 8. Animation

保留：splash 淡入、scroll reveal、subtle fade、hover 轻位移  
减少：旋转、3D flip、过大幅度 scale、装饰性无限动效倾向

## 9. Mobile

- 隐藏 logo tagline，避免顶栏拥挤
- 轮播标题与 section 间距适配
- 汉堡菜单与 CTA 逻辑未改（已可用）

## 10. ChenBridge → Echenterra 残留

已清理：
- 所有可见文案、title、OG、Twitter、keywords、sitemap、robots、聊天欢迎语、CSS 注释

有意保留（历史/技术路径）：
- LinkedIn: linkedin.com/company/chenbridge
- 聊天 API: api-cn.chenbridge.com
- Schema sameAs 中的 LinkedIn 链接

Logo 本身未改动。

---

设计自检：
- 是否像成熟国际 B2B 咨询公司？更接近。
- 是否像 AI 生成模板？噪音已降低。
- 是否“太努力证明高级”？铜色装饰已大幅削弱。

原则：Better Design，而非 More Design。
