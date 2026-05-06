#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const targetDir = args[0] || '.';

const GITHUB_REPO = 'https://github.com/moohng/uni-template.git';
const projectDir = path.resolve(process.cwd(), targetDir);

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

async function main() {
  console.log('\n🚀 创建新项目\n');

  if (targetDir !== '.' && fs.existsSync(projectDir)) {
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

  console.log('🧹 清理模板开发文件...');
  deleteDir(path.join(projectDir, '.github'));
  deleteDir(path.join(projectDir, '.opencode'));
  deleteDir(path.join(projectDir, 'packages'));
  deleteDir(path.join(projectDir, 'scripts'));
  console.log('  ✅ 清理完成\n');

  const projectName = targetDir || process.cwd().split('/').pop();

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

  replaceInFile(path.join(projectDir, 'src/manifest.json'), {
    '__PROJECT_NAME__': projectName,
    '__PROJECT_DESC__': projectDesc,
    '__UNI_APPID__': uniAppid,
    '__WX_APPID__': appid,
  });

  console.log('\n🔄 初始化 Git 仓库...');
  try {
    execSync('git init', { cwd: projectDir, stdio: 'pipe' });
    console.log('  ✅ Git 仓库初始化完成');
  } catch (e) {
    console.log('  ⚠️  Git 初始化跳过');
  }

  console.log('\n✅ 项目创建完成！\n');
  console.log('📦 下一步:');
  if (targetDir) {
    console.log(`   cd ${targetDir === '.' ? '' : targetDir}`);
  }
  console.log('   pnpm install');
  console.log('   pnpm dev:mp-weixin\n');
}

main().catch(console.error);