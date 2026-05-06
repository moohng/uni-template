# @unimp/create

一个用于快速创建 Uni-app 项目的脚手架工具。

## 使用方式

### 方式 1: 使用 npx（推荐）

```bash
# 在当前目录创建
npx @unimp/create

# 在指定目录创建
npx @unimp/create my-project
```

### 方式 2: 全局安装

```bash
npm install -g @unimp/create

# 使用
create my-project
```

## 交互配置

运行脚手架后，会提示输入以下信息：

- **项目名称**: 自动填入（基于目录名）
- **项目描述**: 自定义项目描述
- **微信小程序 AppID**: 可选，用于微信小程序开发
- **Uni-app AppID**: 可选，用于 Uni-app 云服务

## 创建完成后

脚手架会自动：

1. 从 GitHub 拉取最新模板
2. 清理开发专用目录（`.github/`、`.opencode/`、`packages/`、`scripts/`）
3. 替换项目配置占位符
4. 初始化 Git 仓库

安装依赖并启动开发服务器：

```bash
cd my-project
pnpm install
pnpm dev:mp-weixin
```

## 要求

- Node.js >= 14
- pnpm（推荐）或 npm
- Git

## 发布流程（维护者）

### 前置条件

1. 在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加 `NPM_TOKEN`
2. Token 类型：Automation Token（需允许 bypass 2FA）或 Classic Token（需 Publish 权限）
3. `@unimp` 组织需在 npm 上创建，且你的账号有发布权限

### 发布新版本

```bash
# 直接创建并推送 tag（版本号从 tag 名提取）
git tag create-v1.0.0
git push origin create-v1.0.0
```

推送 `create-v*` 格式的 tag 后会自动触发 GitHub Action 发布到 npm，无需手动修改 package.json 版本号。

### 发布历史

| 版本 | 说明 |
|------|------|
| 1.0.0 | 首次发布 |

## License

MIT
