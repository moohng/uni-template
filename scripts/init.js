const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function replaceInFile(filePath, replacements) {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf-8');
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`  ✅ ${filePath}`);
}

async function main() {
  console.log('\n🚀 初始化新项目\n');

  const projectName = await ask('项目名称 (如: my-uni-app): ');
  if (!projectName) {
    console.log('❌ 项目名称不能为空');
    process.exit(1);
  }

  const projectDesc = await ask('项目描述: ') || 'A uni-app project';
  const appid = await ask('微信小程序 AppID (可留空): ') || '';
  const uniAppid = await ask('Uni-app AppID (可留空): ') || '';

  console.log('\n📝 正在替换配置...\n');

  replaceInFile('package.json', {
    '__PROJECT_NAME__': projectName,
    '__PROJECT_DESC__': projectDesc,
  });
  replaceInFile('src/manifest.json', {
    '__PROJECT_NAME__': projectName,
    '__PROJECT_DESC__': projectDesc,
    '__UNI_APPID__': uniAppid,
    '__WX_APPID__': appid,
  });

  console.log('\n🧹 清理开发专用文件...');
  const dirsToRemove = ['.github', '.opencode', 'packages'];
  for (const dir of dirsToRemove) {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`  ✅ 删除 ${dir}/`);
    }
  }

  console.log('\n🔄 重新初始化 Git 仓库...');
  const gitDir = path.join(rootDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
    console.log('  ✅ 清理旧 Git 历史');
  }
  execSync('git init', { cwd: rootDir, stdio: 'pipe' });
  console.log('  ✅ 初始化新 Git 仓库');

  const envLocal = path.join(rootDir, '.env.local');
  if (fs.existsSync(envLocal)) {
    fs.unlinkSync(envLocal);
    console.log('  ✅ 清理 .env.local');
  }

  console.log('\n✅ 初始化完成！\n');
  console.log('📦 下一步:');
  console.log('   pnpm dev:mp-weixin\n');

  console.log('🧹 清理初始化文件...');

  // 先清理 package.json 配置
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  delete pkg.scripts.init;
  delete pkg.scripts.postinstall;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  console.log('  ✅ 清理 init 脚本配置');

  // 最后删除 scripts 目录（脚本会继续执行完成）
  const scriptsDir = path.join(rootDir, 'scripts');
  if (fs.existsSync(scriptsDir)) {
    fs.rmSync(scriptsDir, { recursive: true, force: true });
    console.log('  ✅ 删除 scripts/');
  }

  rl.close();
}

main().catch(console.error);