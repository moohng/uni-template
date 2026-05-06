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
2. 替换项目配置占位符
3. 清理开发相关文件
4. 初始化 Git 仓库

按照提示执行即可开始开发：

```bash
cd my-project
pnpm install
pnpm dev:mp-weixin
```

## 要求

- Node.js >= 14
- pnpm（推荐）或 npm
- Git

## License

MIT
