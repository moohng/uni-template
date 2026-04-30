import { defineStore } from 'pinia';
import { THEMES } from '@/commons/themes';
import { createMyStorage } from '@/commons/utils';

export const useAppStore = defineStore('app', {
  persist: {
    storage: createMyStorage(),
  },
  state: () => {
    return {
      /** 系统状态栏高度 */
      statusBarHeight: uni.getWindowInfo().statusBarHeight,
      /** 胶囊按钮矩形信息 */
      // menuRect: uni.getMenuButtonBoundingClientRect(),
      /** 用户信息示例 */
      user: { nickname: 'Guest', avatar: '' },
      /** 当前主题 ID */
      themeId: 'classic',
      /** 用户 Token */
      token: '',
      /** 用户 OpenID */
      openid: '',
    };
  },
  getters: {
    /** 是否已登录 */
    isLogin: (state) => !!state.token,
    /** 获取当前主题配置 */
    currentTheme: (state) => THEMES.find((t) => t.id === state.themeId) || THEMES[0],
    /** 获取当前主题类名 */
    themeClass: (state) => `theme-${state.themeId}`,
  },
  actions: {
    /** 切换主题 */
    setTheme(id: string) {
      this.themeId = id;
      uni.setStorageSync('themeId', id);
    },
    /** 设置 Token */
    setToken(token: string) {
      this.token = token;
    },
    /** 设置 OpenID */
    setOpenid(openid: string) {
      this.openid = openid;
    },
    /** 退出登录 */
    logout() {
      this.token = '';
      this.user = { nickname: 'Guest', avatar: '' };
    }
  },
});
