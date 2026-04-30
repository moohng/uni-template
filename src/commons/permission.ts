import { ui } from './ui';

/**
 * 微信权限名称类型
 */
export type Scope =
  | 'scope.userInfo'
  | 'scope.userLocation'
  | 'scope.address'
  | 'scope.invoiceTitle'
  | 'scope.invoice'
  | 'scope.werun'
  | 'scope.record'
  | 'scope.writePhotosAlbum'
  | 'scope.camera';

/**
 * 权限描述映射
 */
const scopeDesc: Record<string, string> = {
  'scope.userLocation': '地理位置',
  'scope.address': '通讯地址',
  'scope.record': '录音功能',
  'scope.writePhotosAlbum': '保存到相册',
  'scope.camera': '摄像头',
};

/**
 * 权限申请与引导工具
 */
export const permission = {
  /**
   * 检查并请求权限
   * @param scope 权限名称
   * @param desc 权限用途描述，用于引导弹窗
   */
  async request(scope: Scope, desc?: string): Promise<boolean> {
    // #ifndef MP-WEIXIN
    return true;
    // #endif

    // 1. 获取当前授权状态
    const setting = await new Promise<UniApp.AuthSetting>((resolve) => {
      uni.getSetting({
        success: (res) => resolve(res.authSetting),
        fail: () => resolve({}),
      });
    });

    // 2. 如果已经授权，直接返回 true
    if (setting[scope]) {
      return true;
    }

    // 3. 如果是第一次申请（setting[scope] 为 undefined），直接发起请求
    if (setting[scope] === undefined) {
      return new Promise((resolve) => {
        uni.authorize({
          scope,
          success: () => resolve(true),
          fail: () => resolve(false),
        });
      });
    }

    // 4. 如果之前被拒绝过（setting[scope] 为 false），引导去设置页
    const name = scopeDesc[scope] || '相关';
    const content = desc || `我们需要您的${name}权限以提供完整服务，是否去开启？`;

    const confirmed = await ui.confirm({
      title: '权限提示',
      content,
      confirmText: '去开启',
    });

    if (confirmed) {
      const openSettingRes = await new Promise<UniApp.OpenSettingRes>((resolve) => {
        uni.openSetting({
          success: (res) => resolve(res),
          fail: () => resolve({ authSetting: {} } as any),
        });
      });
      return !!openSettingRes.authSetting[scope];
    }

    return false;
  },

  /**
   * 专门用于保存图片到相册的快捷方法
   */
  async saveImage(tempFilePath: string): Promise<void> {
    const hasPermission = await this.request('scope.writePhotosAlbum', '保存海报需要您的相册写入权限，是否去开启？');
    if (!hasPermission) return;

    uni.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: () => ui.toast('已保存到相册', 'success'),
      fail: (err) => {
        if (err.errMsg.indexOf('cancel') === -1) {
          ui.toast('保存失败');
        }
      }
    });
  }
};
