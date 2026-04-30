<template>
  <view :class="appStore.themeClass" class="page-view-container min-h-screen bg-slate-50 transition-colors duration-300">
    <!-- 顶部状态栏占位 (仅自定义导航栏时需要) -->
    <view v-if="statusBar" :style="{ height: appStore.statusBarHeight + 'px' }" class="w-full"></view>

    <!-- 页面内容插槽 -->
    <view class="page-content" :class="[padding ? 'p-4' : '']">
      <slot></slot>
    </view>

    <!-- 底部安全区占位 -->
    <view v-if="safeArea" class="pb-safe w-full"></view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

interface Props {
  /** 是否留出状态栏高度 */
  statusBar?: boolean;
  /** 是否开启底部安全区适配 */
  safeArea?: boolean;
  /** 是否默认添加内边距 */
  padding?: boolean;
}

withDefaults(defineProps<Props>(), {
  statusBar: false,
  safeArea: true,
  padding: false
});

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.page-view-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.page-content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}
</style>
