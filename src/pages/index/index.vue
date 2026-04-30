<template>
  <view :class="appStore.themeClass" class="min-h-screen bg-slate-50 transition-colors duration-300">
    <view class="p-6 flex flex-col items-center">
      <view class="size-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
        <text class="i-lucide-palette size-10 text-primary"></text>
      </view>
      <view class="text-2xl font-bold text-slate-800 mb-2">Theme System</view>
      <view class="text-slate-400 text-sm mb-8 text-center">Click a color to switch the global theme</view>

      <!-- 主题切换器 -->
      <view class="grid grid-cols-4 gap-4 w-full px-4 mb-12">
        <view
          v-for="theme in THEMES"
          :key="theme.id"
          class="flex flex-col items-center gap-2"
          @click="appStore.setTheme(theme.id)"
        >
          <view
            class="size-12 rounded-full border-4 transition-all"
            :class="appStore.themeId === theme.id ? 'border-slate-300 scale-110 shadow-lg' : 'border-transparent'"
            :style="{ backgroundColor: theme.color }"
          ></view>
          <text class="text-xs font-medium text-slate-600">{{ theme.name }}</text>
        </view>
      </view>

      <!-- 预览效果 -->
      <view class="w-full space-y-4">
        <view class="bg-lucky p-6 rounded-2xl text-white">
          <view class="font-bold mb-1">Primary Gradient (bg-lucky)</view>
          <view class="text-sm opacity-80">This box uses the primary theme colors.</view>
        </view>

        <button
          class="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
          @click="onToast"
        >
          Primary Button
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { THEMES } from '@/commons/themes';

const appStore = useAppStore();

const onToast = () => {
  uni.showToast({
    title: `Current: ${appStore.currentTheme.name}`,
    icon: 'none'
  });
};
</script>

<style>
page {
  background-color: #f8fafc;
}
</style>
