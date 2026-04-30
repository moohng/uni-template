<template>
  <view class="ad-container" v-show="showAd">
    <ad class="ad-banner" v-if="unitId" :unit-id="unitId" :ad-intervals="60" @load="onAdLoad"
      @error="onAdError" @close="onAdClose" />
  </view>
  <slot v-if="!unitId || !showAd"></slot>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  unitId: {
    type: String,
    default: "",
  },
});

const adLoaded = ref(false);
const onAdLoad = () => {
  console.log("banner 广告加载成功");
  adLoaded.value = true;
};

const showAd = ref(true);
const onAdError = (event: any) => {
  console.error("banner 广告加载失败", event);
  showAd.value = false;
};
const onAdClose = () => {
  console.log("banner 广告关闭");
  showAd.value = false;
};
</script>

<style lang="scss" scoped>
.ad-container {
  width: 100%;
  margin: 0;
  line-height: 0;
  box-sizing: border-box;
}

.ad-banner {
  width: 100% !important;
  border-radius: 16rpx;
  overflow: hidden;
}
</style>
