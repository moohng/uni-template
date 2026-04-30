/**
 * 生成随机 UUID
 */
export function uuid(len = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

/**
 * 获取小程序ID
 */
export function getAppId() {
  // @ts-ignore
  return uni.getAccountInfoSync().miniProgram.appId;
}

/**
 * 格式化时间示例
 */
export function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

/**
 * 兼容小程序端
 * @returns 
 */
export function createMyStorage() {
  // #ifdef H5
  return window.localStorage;
  // #endif
  // #ifdef MP-WEIXIN
  return {
    getItem(key: string) {
      return uni.getStorageSync(key);
    },
    setItem(key: string, value: unknown) {
      uni.setStorageSync(key, value);
    },
    removeItem(key: string) {
      uni.removeStorageSync(key);
    },
    clear() {
      uni.clearStorageSync();
    },
  };
  // #endif
}
