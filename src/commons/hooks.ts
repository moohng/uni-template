import { onReady, onUnload } from '@dcloudio/uni-app';
import { ref } from 'vue';

/**
 * 示例 Hook: 视频广告封装
 */
export function useVideoAd(adUnitId: string) {
  const adLoaded = ref(false);
  let videoAd: UniNamespace.RewardedVideoAdContext | null = null;

  onReady(() => {
    // #ifdef MP-WEIXIN
    videoAd = uni.createRewardedVideoAd({ adUnitId });
    videoAd?.onLoad(() => (adLoaded.value = true));
    videoAd?.onError(() => (adLoaded.value = false));
    // #endif
  });

  const showVideoAd = () => {
    return videoAd?.show().catch(() => videoAd?.load().then(() => videoAd?.show()));
  };

  return { adLoaded, showVideoAd };
}
