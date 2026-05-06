#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const targetDir = args[0] || '.';

const GITHUB_REPO = 'https://github.com/moohng/uni-template.git';
const projectDir = path.resolve(process.cwd(), targetDir);
const isCreateMode = !fs.existsSync(path.join(projectDir, 'src/manifest.json'));

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
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (e) {
    // Ignore deletion errors (e.g., file locks on Windows)
  }
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

async function initProject() {
  const projectName = targetDir !== '.' ? targetDir : path.basename(process.cwd());
  const projectDesc = 'A uni-app project';
  const appid = '';
  const uniAppid = '';

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
  for (const dir of ignoreList) {
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

  console.log('\n📦 安装依赖...\n');
  try {
    execSync('pnpm install', {
      stdio: 'inherit',
      cwd: projectDir,
    });
  } catch (e) {
    console.error('❌ 依赖安装失败');
    process.exit(1);
  }

  console.log('\n✅ 项目初始化完成！\n');
  console.log('🚀 下一步:');
  if (isCreateMode && targetDir !== '.') {
    console.log(`   cd ${targetDir}`);
  }
  console.log('   pnpm dev:mp-weixin\n');
}

async function main() {
  console.log('\n🚀 初始化项目\n');

  // Check if already initialized
  const pkgPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    if (!pkg.name.startsWith('__')) {
      console.log('✅ 项目已初始化，跳过此步骤');
      return;
    }
  }

  // Only clone template for create mode (npx create-unimp <dir>)
  if (isCreateMode) {
    if (targetDir !== '.' && fs.existsSync(projectDir)) {
      console.error(`❌ 目录 ${targetDir} 已存在`);
      process.exit(1);
    }

    const tempDir = path.join(os.tmpdir(), `uni-template-temp-${Date.now()}`);

    console.log('📥 从 GitHub 拉取模板...');
    try {
      deleteDir(tempDir);
      execSync(`git clone --depth 1 "${GITHUB_REPO}" "${tempDir}"`, {
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
