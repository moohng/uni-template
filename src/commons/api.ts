import { getAppId } from './utils';
import { ui } from './ui';

const COMMON_URL = import.meta.env.VITE_COMMON_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * 核心请求封装
 * 支持自动携带基础 Header
 */
async function request<T = any>(options: UniApp.RequestOptions & { showLoading?: boolean }): Promise<T> {
  if (options.showLoading) ui.loading();

  const token = uni.getStorageSync('token');
  const openid = uni.getStorageSync('openid');

  const header = {
    'Content-Type': 'application/json',
    'x-wx-openid': openid,
    'x-wx-appid': getAppId(),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.header,
  };

  return new Promise((resolve, reject) => {
    uni.request({
      timeout: 15000, // 增加超时控制
      ...options,
      header,
      success: (res) => {
        if (options.showLoading) ui.hideLoading();
        resolve(res.data as T);
      },
      fail: (err) => {
        if (options.showLoading) ui.hideLoading();
        ui.toast('网络连接超时或失败');
        reject(err);
      },
    });
  });
}

/**
 * 获取用户 OpenID
 */
export async function getOpenid() {
  return new Promise<string>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        uni.request({
          url: `${COMMON_URL}/api/wxmp/getOpenId?code=${res.code}`,
          method: 'GET',
          header: { 'x-wx-appid': getAppId() },
          success: (res: any) => {
            const data = res.data;
            if (data?.openid) {
              uni.setStorageSync('openid', data.openid);
              resolve(data.openid);
            } else {
              reject(new Error('获取openid失败'));
            }
          },
          fail: (err) => reject(err),
        });
      },
      fail: (err) => reject(err),
    });
  });
}

/**
 * 检查内容安全
 */
export async function checkSecurity(content: string) {
  return request({
    url: `${COMMON_URL}/api/wxmp/msgSecCheck`,
    method: 'POST',
    data: { content },
  });
}

/** 示例 API: 获取列表 */
export async function getSampleList() {
  return request({
    url: 'https://api.example.com/list',
    method: 'GET',
  });
}
