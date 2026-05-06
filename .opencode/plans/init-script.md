# Uni-Template 脚手架初始化方案

## 目标
让用户能通过三种方式快速基于此模板创建新项目：
1. GitHub Template
2. degit 命令行
3. 克隆后 init 脚本

## 实施步骤

### 1. 创建 `scripts/init.js`
- 交互式提示输入：项目名称、描述、微信小程序 AppID、Uni-app AppID
- 自动替换 `package.json`、`src/manifest.json` 中的占位符
- 清理旧 git 历史并重新初始化
- 清理 `.env.local` 等敏感文件

### 2. 更新 `package.json`
- `name`: `"uni-template"` → `"__PROJECT_NAME__"`
- 添加脚本: `"init": "node scripts/init.js"`

### 3. 更新 `src/manifest.json`
- `name`: `"turn-money-app"` → `"__PROJECT_NAME__"`
- `appid`: `""` → `"__UNI_APPID__"`
- `description`: `""` → `"__PROJECT_DESC__"`
- `mp-weixin.appid`: `"wx79fd704b15fe3852"` → `"__WX_APPID__"`

### 4. 更新 `.gitignore`
- 添加 `.env.local`、`.env.*.local`

### 5. 更新 `README.md`
- 添加三种初始化方式的说明
- 仓库地址: `https://github.com/moohng/uni-template`
