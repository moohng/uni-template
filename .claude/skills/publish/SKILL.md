---
name: publish
description: >
  当用户说"发布"、"推送版本"、"打 tag"、"发版"、"publish"、"deploy"、"release"时触发。
  自动提交代码、打正确的 tag 并推送到 GitHub。
---

# Publish

## 执行流程

1. **检查状态**：`git status`、`git diff --stat`、`git log --oneline -3`

2. **提交代码**：
   ```bash
   git add .
   git commit -m "<根据更改内容生成 Conventional Commits 格式消息>"
   ```

3. **判断是否需要 tag**：
   - 用户明确说"发布"/"打 tag" → 需要
   - 用户只说"提交"/"推送" → 不需要

4. **打 tag（如果需要）**：
   - tag 命名规则：`create-v<版本号>`
   - 版本号自动递增：获取历史最高 tag 版本号，patch + 1

   获取版本号命令：
   ```bash
   # 获取最新 tag（如 create-v1.0.3 或 v1.2.0）
   git tag --sort=-v:refname | grep -E '^(create-v|v)' | head -1
   ```

   递增规则：`1.0.3` → `1.0.4`（默认 patch+1），用户可指定其他递增

   ```bash
   git tag <tag-name>
   ```

5. **推送**：
   ```bash
   git push
   git push origin <tag-name>  # 仅在有 tag 时执行
   ```

## 注意事项

- Tag 已存在时先删除：`git tag -d <tag>` && `git push --delete origin <tag>`
- Commit message 根据 diff 内容智能生成
