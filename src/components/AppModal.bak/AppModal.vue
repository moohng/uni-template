<template>
  <page-container
    :show="show"
    :position="position"
    :round="round"
    :overlay="overlay"
    :custom-style="containerStyle"
    @afterleave="onClose"
    @clickoverlay="onOverlayClick"
  >
    <view class="app-modal-content flex flex-col p-6 bg-white overflow-hidden" :class="[position === 'bottom' ? 'rounded-t-3xl pb-safe' : 'rounded-2xl']">
      <!-- 头部 -->
      <view class="flex justify-between items-center mb-6">
        <text class="text-lg font-bold text-main">{{ title }}</text>
        <view
          v-if="showClose"
          class="i-lucide:x text-2xl text-gray-300 active:text-gray-500 p-1"
          @click="onClose"
        />
      </view>

      <!-- 内容区 -->
      <view class="flex-1 overflow-y-auto max-h-[70vh] min-h-[100rpx]">
        <slot></slot>
      </view>

      <!-- 底部操作区 -->
      <view class="mt-8">
        <slot name="footer">
          <view v-if="showConfirm" class="btn btn-primary w-full" @click="onConfirm">
            {{ confirmText }}
          </view>
        </slot>
      </view>
    </view>
  </page-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  /** 是否显示 */
  show: boolean;
  /** 标题 */
  title?: string;
  /** 弹出位置: bottom | center | top | right */
  position?: 'bottom' | 'center' | 'top' | 'right';
  /** 是否显示关闭图标 */
  showClose?: boolean;
  /** 是否显示默认确认按钮 */
  showConfirm?: boolean;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 是否显示遮罩 */
  overlay?: boolean;
  /** 是否圆角 */
  round?: boolean;
  /** 点击遮罩是否允许关闭 */
  closeOnClickOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: '',
  position: 'bottom',
  showClose: true,
  showConfirm: false,
  confirmText: '确定',
  overlay: true,
  round: true,
  closeOnClickOverlay: true
});

const emit = defineEmits(['update:show', 'close', 'confirm']);

/**
 * 根据位置计算容器样式
 */
const containerStyle = computed(() => {
  if (props.position === 'center') {
    return 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 85%; height: fit-content; background: transparent;';
  }
  return '';
});

const onClose = () => {
  emit('update:show', false);
  emit('close');
};

const onOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    onClose();
  }
};

const onConfirm = () => {
  emit('confirm');
};
</script>

<style scoped>
.app-modal-content {
  box-sizing: border-box;
}

/* 针对 center 模式下的 page-container 背景透明补丁 */
:deep(.uni-page-container) {
  background-color: transparent !important;
}
</style>
