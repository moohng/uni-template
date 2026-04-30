<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
  checkUpdate();
});

/**
 * 小程序版本更新检查
 */
function checkUpdate() {
  // #ifdef MP-WEIXIN
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      console.log('有新版本可用');
    }
  });
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res) => {
        if (res.confirm) updateManager.applyUpdate();
      },
    });
  });
  // #endif
}

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

// 监听全局报错 (非 Vue 报错)
// #ifdef MP-WEIXIN
uni.onError((err) => {
  console.error('Global Error:', err);
});
// #endif
</script>

<style lang="scss">
// 全局样式
page {
  /* 基础颜色变量 */
  --primary: #ef4444;
  --primary-5: rgba(239, 68, 68, 0.05);
  --primary-10: rgba(239, 68, 68, 0.1);
  --primary-20: rgba(239, 68, 68, 0.2);
  --primary-30: rgba(239, 68, 68, 0.3);
  --primary-80: rgba(239, 68, 68, 0.8);

  --success: #4cd964;
  --warning: #f0ad4e;
  --error: #dd524d;

  /* 渐变色变量 */
  --lucky-from: #ef4444;
  --lucky-to: #db2777;

  /* 文本颜色 */
  --text-base: #1e293b;
  --text-disabled: #999;

  /* 背景颜色 */
  --bg-default: #f4f7fa;

  /* 边框颜色 */
  --border-color: #f1f5f9;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-base);
  background-color: var(--bg-default);
  -webkit-overflow-scrolling: touch;
  word-break: break-all;
}

/* 多主题定义 */
.theme-black {
  --primary: #0F172B;
  --primary-5: rgba(15, 23, 43, 0.05);
  --primary-10: rgba(30, 41, 59, 0.1);
  --primary-20: rgba(30, 41, 59, 0.2);
  --primary-30: rgba(30, 41, 59, 0.3);
  --primary-80: rgba(30, 41, 59, 0.8);
  --lucky-from: #0F172B;
  --lucky-to: #020618;
}

.theme-forest {
  --primary: #10b981;
  --primary-5: rgba(16, 185, 129, 0.05);
  --primary-10: rgba(16, 185, 129, 0.1);
  --primary-20: rgba(16, 185, 129, 0.2);
  --primary-30: rgba(16, 185, 129, 0.3);
  --primary-80: rgba(16, 185, 129, 0.8);
  --lucky-from: #10b981;
  --lucky-to: #059669;
}

.theme-sunset {
  --primary: #f97316;
  --primary-5: rgba(249, 115, 22, 0.05);
  --primary-10: rgba(249, 115, 22, 0.1);
  --primary-20: rgba(249, 115, 22, 0.2);
  --primary-30: rgba(249, 115, 22, 0.3);
  --primary-80: rgba(249, 115, 22, 0.8);
  --lucky-from: #f97316;
  --lucky-to: #dc2626;
}

.theme-sky {
  --primary: #0ea5e9;
  --primary-5: rgba(14, 165, 233, 0.05);
  --primary-10: rgba(14, 165, 233, 0.1);
  --primary-20: rgba(14, 165, 233, 0.2);
  --primary-30: rgba(14, 165, 233, 0.3);
  --primary-80: rgba(14, 165, 233, 0.8);
  --lucky-from: #0ea5e9;
  --lucky-to: #38bdf8;
}

.theme-galaxy {
  --primary: #8b5cf6;
  --primary-5: rgba(139, 92, 246, 0.05);
  --primary-10: rgba(139, 92, 246, 0.1);
  --primary-20: rgba(139, 92, 246, 0.2);
  --primary-30: rgba(139, 92, 246, 0.3);
  --primary-80: rgba(139, 92, 246, 0.8);
  --lucky-from: #8b5cf6;
  --lucky-to: #4f46e5;
}

.theme-sakura {
  --primary: #ec4899;
  --primary-5: rgba(236, 72, 153, 0.05);
  --primary-10: rgba(236, 72, 153, 0.1);
  --primary-20: rgba(236, 72, 153, 0.2);
  --primary-30: rgba(236, 72, 153, 0.3);
  --primary-80: rgba(236, 72, 153, 0.8);
  --lucky-from: #ec4899;
  --lucky-to: #be185d;
}

/* 辅助样式 */
.mb-safe { margin-bottom: env(safe-area-inset-bottom); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }

.bg-lucky {
  background: linear-gradient(to bottom right, var(--lucky-from), var(--lucky-to));
  box-shadow: 0 10rpx 30rpx var(--primary-30);
}

.reset-btn {
  margin: 0; padding: 0; line-height: inherit; background-color: transparent; border: 0; outline: 0; font-size: inherit;
  &::after { content: none; display: none; }
}
</style>
