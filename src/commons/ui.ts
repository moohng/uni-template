import { useAppStore } from '@/store/app';

/**
 * 统一的交互反馈封装
 */
export const ui = {
  /**
   * 显示提示消息
   */
  toast(title: string, icon: 'success' | 'loading' | 'error' | 'none' = 'none') {
    uni.showToast({
      title,
      icon,
      duration: 2000
    });
  },

  /**
   * 显示确认对话框
   * @param options 内容字符串或官方完整参数
   */
  confirm(options: string | UniApp.ShowModalOptions, title = '提示'): Promise<boolean> {
    const appStore = useAppStore();
    const defaultOptions: UniApp.ShowModalOptions = {
      title,
      confirmColor: appStore.currentTheme.color, // 默认跟随主题色
    };

    const finalOptions = typeof options === 'string'
      ? { ...defaultOptions, content: options }
      : { ...defaultOptions, ...options };

    return new Promise((resolve) => {
      uni.showModal({
        ...finalOptions,
        success: (res) => {
          resolve(res.confirm);
        },
        fail: () => {
          resolve(false);
        }
      });
    });
  },

  /**
   * 引用计数器，用于管理多个 loading
   */
  _loadingCount: 0,

  /**
   * 显示加载中
   */
  loading(title = '加载中...') {
    this._loadingCount++;
    if (this._loadingCount === 1) {
      uni.showLoading({
        title,
        mask: true
      });
    }
  },

  /**
   * 隐藏加载中
   */
  hideLoading() {
    if (this._loadingCount <= 0) return;
    this._loadingCount--;
    if (this._loadingCount === 0) {
      uni.hideLoading();
    }
  }
};
