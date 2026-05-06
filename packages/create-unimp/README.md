# create-unimp

快速创建 Uni-app 项目的脚手架工具。

## 使用方式

```bash
npx create-unimp my-project
```

或全局安装：

```bash
npm install -g create-unimp
create-unimp my-project
```

## 交互配置

运行后会提示输入：

- **项目名称**: 自动填入（基于目录名）
- **项目描述**: 自定义项目描述
- **微信小程序 AppID**: 可选
- **Uni-app AppID**: 可选

## 创建完成后

脚手架会自动：

1. 从 GitHub 拉取最新模板
2. 按 `.initignore` 清理开发专用文件
3. 替换项目配置占位符
4. 清理 Git 历史

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

推送 `create-v*` 格式的 tag 后会自动触发 GitHub Action 发布到 npm：

```bash
git tag create-v1.0.0
git push origin create-v1.0.0
```

## License

MIT
