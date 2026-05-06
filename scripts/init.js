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
  console.log('   pnpm install');
  console.log('   pnpm dev:mp-weixin\n');

  rl.close();
}

main().catch(console.error);