<template>
  <PageView padding>
    <view class="flex flex-col items-center">
      <view class="size-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
        <text class="i-lucide-palette size-10 text-primary"></text>
      </view>
      <view class="text-2xl font-bold text-slate-800 mb-2">Playground</view>
      <view class="text-slate-400 text-sm mb-8 text-center">这里是脚手架的功能演示区。你可以在此测试主题切换、交互弹窗以及 PageView 容器的特性。</view>

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
          <view class="font-bold mb-1">主题渐变 (bg-lucky)</view>
          <view class="text-sm opacity-80">会自动随主题颜色变化。</view>
        </view>

        <button
          class="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
          @click="onToast"
        >
          主题色按钮 (bg-primary)
        </button>
      </view>
    </view>
  </PageView>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView/PageView.vue';
import { useAppStore } from '@/store/app';
import { THEMES } from '@/commons/themes';
import { ui } from '@/commons/ui';

const appStore = useAppStore();

const onToast = async () => {
  const confirmed = await ui.confirm(`确认切换到主题：${appStore.currentTheme.name} 吗？`);
  if (confirmed) {
    ui.toast('切换成功', 'success');
  }
};
</script>

<style>
page {
  background-color: #f8fafc;
}
</style>
