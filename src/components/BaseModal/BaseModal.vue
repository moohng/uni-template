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
    <view class="base-modal-content flex flex-col p-6 bg-white overflow-hidden" :class="[position === 'bottom' ? 'rounded-t-3xl pb-safe' : 'rounded-2xl']">
      <!-- Header -->
      <view class="flex justify-between items-center mb-6">
        <text class="text-lg font-bold text-main">{{ title }}</text>
        <view
          v-if="showClose"
          class="i-lucide:x text-2xl text-gray-300 active:text-gray-500 p-1"
          @click="onClose"
        />
      </view>

      <!-- Content -->
      <view class="flex-1 overflow-y-auto max-h-[70vh] min-h-[100rpx]">
        <slot></slot>
      </view>

      <!-- Footer -->
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

defineOptions({ name: 'BaseModal' });

interface Props {
  show: boolean;
  title?: string;
  position?: 'bottom' | 'center' | 'top' | 'right';
  showClose?: boolean;
  showConfirm?: boolean;
  confirmText?: string;
  overlay?: boolean;
  round?: boolean;
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
.base-modal-content {
  box-sizing: border-box;
}

:deep(.uni-page-container) {
  background-color: transparent !important;
}
</style>
