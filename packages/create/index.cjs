#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const targetDir = args[0] || '.';

const GITHUB_REPO = 'https://github.com/moohng/uni-template.git';
const projectDir = path.resolve(process.cwd(), targetDir);
const isCreateMode = targetDir !== '.';

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function deleteDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function getIgnoreList(projectDir) {
  const initignorePath = path.join(projectDir, '.initignore');
  const ignoreList = [];
  if (fs.existsSync(initignorePath)) {
    const content = fs.readFileSync(initignorePath, 'utf-8');
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        ignoreList.push(line.replace(/\/$/, ''));
      }
    });
  }
  return ignoreList;
}

async function ask(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function initProject() {
  const projectName = isCreateMode
    ? (targetDir || path.basename(process.cwd()))
    : await ask('项目名称 (如: my-uni-app): ');

  if (!isCreateMode && !projectName) {
    console.log('❌ 项目名称不能为空');
    process.exit(1);
  }

  const projectDesc = await ask('项目描述: ') || 'A uni-app project';
  const appid = await ask('微信小程序 AppID (可留空): ') || '';
  const uniAppid = await ask('Uni-app AppID (可留空): ') || '';

  console.log('\n📝 正在替换配置...\n');

  const pkgPath = path.join(projectDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  pkg.description = projectDesc;
  delete pkg.scripts.init;
  delete pkg.scripts.postinstall;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  console.log('  ✅ package.json');

  replaceInFile(path.join(projectDir, 'src/manifest.json'), {
    '__PROJECT_NAME__': projectName,
    '__PROJECT_DESC__': projectDesc,
    '__UNI_APPID__': uniAppid,
    '__WX_APPID__': appid,
  });

  console.log('\n🧹 清理开发专用文件...');

  const ignoreList = getIgnoreList(projectDir);
  // packages/ needs to be deleted last (this script lives inside it)
  for (const dir of ignoreList) {
    if (dir === 'packages') continue;
    const dirPath = path.join(projectDir, dir);
    if (fs.existsSync(dirPath)) {
      deleteDir(dirPath);
      console.log(`  ✅ 删除 ${dir}`);
    }
  }

  console.log('\n🔄 清理 Git 历史...');
  const gitDir = path.join(projectDir, '.git');
  if (fs.existsSync(gitDir)) {
    deleteDir(gitDir);
    console.log('  ✅ Git 历史已清理');
  }

  console.log('\n✅ 初始化完成！\n');
  console.log('📦 下一步:');
  if (isCreateMode) {
    console.log(`   cd ${targetDir}`);
  }
  console.log('   pnpm install');
  console.log('   pnpm dev:mp-weixin\n');

  // Clean up self (inside packages/) last
  const packagesDir = path.join(projectDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    deleteDir(packagesDir);
    console.log('🧹 清理初始化文件...');
    console.log('  ✅ 删除 packages/');
  }
}

async function main() {
  console.log(isCreateMode ? '\n🚀 创建新项目\n' : '\n🚀 初始化新项目\n');

  // Create mode: download from GitHub
  if (isCreateMode) {
    if (fs.existsSync(projectDir)) {
      console.error(`❌ 目录 ${targetDir} 已存在`);
      process.exit(1);
    }

    const tempDir = path.join(process.cwd(), '.uni-template-temp');

    console.log('📥 从 GitHub 拉取模板...');
    try {
      deleteDir(tempDir);
      execSync(`git clone --depth 1 ${GITHUB_REPO} .uni-template-temp`, {
        cwd: process.cwd(),
        stdio: 'pipe',
      });
      console.log('  ✅ 模板下载完成\n');
    } catch (e) {
      console.error('❌ 模板拉取失败，请检查网络连接或仓库地址');
      process.exit(1);
    }

    copyDir(tempDir, projectDir);
    deleteDir(tempDir);
  }

  await initProject();
}

main().catch(console.error);
