# Uni Template

一个专业的 Uni-app 项目模板，集成现代前端工具链，支持微信小程序与 H5 双端开发。

## 特性

- **Vue 3 + TypeScript**: 完整的类型支持与现代组件开发体验
- **UnoCSS**: 原子化 CSS 方案，配合 `unocss-preset-weapp` 完美适配微信小程序
- **Pinia**: 轻量状态管理，支持小程序持久化存储
- **Lucide 图标**: 通过 `i-lucide-xxx` 类名直接调用
- **开发规范**: 内置 TypeScript 类型检查、UnoCSS 规范约束

## 快速开始

### 方式 1: 使用 create 命令（推荐）

```bash
npx create-unimp my-project
cd my-project
pnpm dev:mp-weixin
```

### 方式 2: GitHub Template

1. 访问 https://github.com/moohng/uni-template
2. 点击 "Use this template" 创建新仓库
3. 克隆到本地后运行:
   ```bash
   pnpm run init     # 初始化项目配置并安装依赖
   pnpm dev:mp-weixin
   ```

### 方式 3: 使用 degit

```bash
npx degit moohng/uni-template my-project
cd my-project
pnpm run init       # 初始化项目配置并安装依赖
pnpm dev:mp-weixin
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm dev:mp-weixin` | 微信小程序开发模式 |
| `pnpm build:mp-weixin` | 微信小程序打包 |
| `pnpm dev:h5` | H5 开发模式 |
| `pnpm build:h5` | H5 打包 |
| `pnpm type-check` | TypeScript 类型检查 |

## 项目初始化

**使用 `npx create-unimp` 创建**：脚手架会自动完成所有配置替换、文件清理和依赖安装。

**使用 GitHub Template 或 degit 克隆**：下载后请运行以下命令完成初始化：

```bash
pnpm run init
```

该命令会执行以下操作：

1. 替换 `package.json` 和 `manifest.json` 中的占位符
2. 按 `.initignore` 清理开发专用文件（如 CI 配置、文档等）
3. 清理 Git 历史，准备新的版本库
4. 自动安装所有依赖

初始化完成后，`init` 脚本会自动从 `package.json` 中移除。

## 目录结构

```
├── docs/              # 设计资源、需求文档
├── src/
│   ├── commons/       # API 请求、工具函数
│   ├── components/    # 全局复用组件
│   ├── pages/         # 页面组件
│   ├── store/         # Pinia 状态管理
│   └── static/        # 静态资源
├── unocss.config.ts   # UnoCSS 配置
├── vite.config.ts     # Vite 配置
└── tsconfig.json      # TypeScript 配置
```

## 技术栈

- **框架**: Uni-app (Vue 3)
- **语言**: TypeScript
- **样式**: UnoCSS + unocss-preset-weapp
- **状态管理**: Pinia + 持久化
- **构建工具**: Vite

## License

MIT
