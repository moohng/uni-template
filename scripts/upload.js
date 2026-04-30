const ci = require('miniprogram-ci');
const path = require('path');
const fs = require('fs');

/**
 * 微信小程序自动上传脚本
 */

const projectRoot = path.resolve(__dirname, '../');
const manifestPath = path.join(projectRoot, 'src/manifest.json');

// 1. 获取基础信息
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const appid = manifest['mp-weixin'].appid;

// 优先从环境变量读取版本号（GitHub Action 传入），否则读取 manifest 并自动增长
let version = process.env.APP_VERSION;

if (!version) {
  version = manifest.versionName || '1.0.0';
  const versionParts = version.split('.').map(Number);
  if (versionParts.length === 3) {
    versionParts[2] += 1;
    version = versionParts.join('.');

    // 同步写回本地文件，保持代码库版本号更新
    manifest.versionName = version;
    manifest.versionCode = (parseInt(manifest.versionCode) + 1).toString();
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4), 'utf8');
    console.log(`✨ 本地版本号已自动递增: ${version}`);
  }
} else {
  // 如果是 CI 传入的版本号，移除可能存在的 'v' 前缀
  version = version.replace(/^v/, '');
  console.log(`📡 使用 CI 传入的版本号: ${version}`);
}

// 2. 密钥路径处理 (CI 环境下密钥文件通过 Secret 写入)
const privateKeyPath = path.join(projectRoot, 'private.key');

// 3. 初始化项目
const project = new ci.Project({
  appid,
  type: 'miniProgram',
  projectPath: path.join(projectRoot, 'dist/build/mp-weixin'),
  privateKeyPath,
  ignores: ['node_modules/**/*', 'README.md'],
});

async function upload() {
  console.log(`🚀 准备上传小程序: ${appid} v${version}`);

  try {
    const uploadResult = await ci.upload({
      project,
      version,
      desc: `Auto upload via ${process.env.APP_VERSION ? 'GitHub Actions' : 'Local Script'} at ${new Date().toLocaleString()}`,
      setting: {
        es6: true,
        minify: true,
        autoPrefixer: true,
      },
      onProgressUpdate: console.log,
    });

    console.log('✅ 上传成功！');
    console.log(uploadResult);
  } catch (error) {
    console.error('❌ 上传失败:');
    console.error(error);
    process.exit(1);
  }
}

upload();
