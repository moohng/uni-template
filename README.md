# Uni Template

一个用于快速开发的专业 Uni-app 脚手架。

## 技术栈
- **框架**: Uni-app (Vue 3)
- **语言**: TypeScript
- **样式**: UnoCSS + unocss-preset-weapp
- **图标**: Lucide (通过 Iconify/UnoCSS)
- **状态管理**: Pinia + 持久化

## 目录结构
- `docs/`: 设计资源、需求文档和推广素材。
- `src/`: 应用程序源代码。
  - `commons/`: API 请求和工具函数。
  - `components/`: 全局复用组件。
  - `pages/`: 页面组件。
  - `store/`: Pinia 状态管理。
  - `static/`: 静态资源（图片、图标等）。

## 开发规范与规则

### 开发命令
- **微信小程序 (开发模式):** `pnpm dev:mp-weixin`
- **微信小程序 (打包模式):** `pnpm build:mp-weixin`
- **H5 (开发模式):** `pnpm dev:h5`
- **H5 (打包模式):** `pnpm build:h5`
- **类型检查:** `pnpm type-check`

### 技术规范与约束 (微信小程序)
- **样式方案:** 使用 UnoCSS 配合 `unocss-preset-weapp`。
  - **布局约束**: `space-x/y` 或 `divide-x/y` 在小程序端无效。**解决方案**: 直接子级必须是 `view` 标签，或使用 `flex` + `gap`。
  - **色彩/透明度约束**: `primary` 等基于 CSS 变量的颜色不支持 `bg-primary/10` 动态写法。**解决方案**: 必须在 `unocss.config.ts` 中预定义静态规则（如 `bg-primary_10`）。
  - **动态 Class 约束**: `:class` 绑定中不支持斜杠 `/` 或小数点 `.`。**解决方案**: 必须替换为下划线 `_`（如 `bg-primary_10`, `w-3_5rpx`）。
- **图标:** 使用 Lucide 图标库，通过 `i-lucide-xxx` 类名调用。
- **样式捷径 (Shortcuts)**: 优先使用预定义的语义化类名，如 `card-base`, `text-main`, `btn`, `col-center` 等。
- **状态管理:** 使用 Pinia，集成 `createMyStorage` 处理小程序持久化。

### 编程原则
- **底层逻辑**: 优先考虑性能与用户体验。
- **类型安全**: 必须为 API 请求、Store 状态定义完整的 TypeScript 接口。全局类型在 `src/types/index.d.ts` 定义。
- **组件化**: 复杂的页面逻辑应拆分为独立组件。
- **AI 协作**: 
    - 开发者通过 Prompt 描述需求，由 Agent 根据 `docs/` 下的规范进行编码。
    - 生成新页面时应参考现有的 `PageView` 模式。
    - 引用 API 时应检查 `src/commons/api.ts` 是否有已有定义。

## 快速开始
1. 安装依赖: `pnpm install`
2. 运行开发模式: `pnpm dev:mp-weixin`
