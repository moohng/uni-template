# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## 开发命令

### 构建与运行
- **微信小程序 (开发模式):** `pnpm dev:mp-weixin`
- **微信小程序 (打包模式):** `pnpm build:mp-weixin`
- **H5 (开发模式):** `pnpm dev:h5`
- **H5 (打包模式):** `pnpm build:h5`

### 代码质量
- **类型检查:** `pnpm type-check`

## 项目概述

这是一个基于 **Uni-app** 的专业开发脚手架，集成了 **Vue 3**, **TypeScript**, **Vite**, **Pinia**, **UnoCSS** 和 **Lucide 图标库**。

### 核心架构与目录结构
- `docs/`: 开发资源与文档。
  - `html/`: 设计原型/HTML 演示。
  - `poster/`: 推广海报设计素材。
  - `requirements/`: 需求文档。
- `src/pages/`: 业务页面。
- `src/store/`: 基于 Pinia 的状态管理，已集成持久化。
- `src/commons/`: 核心通用逻辑。
  - `api.ts`: 请求封装与接口定义。
  - `utils.ts`: 工具函数。
  - `hooks.ts`: 通用 Composition API。
- `src/components/`: 全局公用组件。
- `src/uni_modules/`: 第三方或自定义 Uni-app 插件（如 `lime-painter`）。
- `static/`: 静态资源（图标、图片等）。

### 技术规范
- **样式方案:** 使用 UnoCSS 配合 `unocss-preset-weapp`。
- **图标:** 使用 Lucide 图标库，通过 `i-lucide-xxx` 类名调用。
- **状态管理:** 推荐使用 Pinia，并根据需要配置 `persist: true` 进行持久化。
- **跨平台:** 主要优化目标为微信小程序 (`#ifdef MP-WEIXIN`)，同时也兼顾 H5。

## 编程原则
- **底层逻辑**: 优先考虑性能与用户体验。
- **类型安全**: 必须为 API 请求、Store 状态定义完整的 TypeScript 接口。
- **组件化**: 复杂的页面逻辑应拆分为独立组件。
- **文档先行**: 重大架构调整先修改此文档或在 `docs/` 下记录。
