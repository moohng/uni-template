import { getAppId } from './utils';
import { ui } from './ui';
import { useAppStore } from '@/store/app';

const COMMON_URL = import.meta.env.VITE_COMMON_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * 挂起的请求队列
 */
let retryQueue: Array<(token: string) => void> = [];
/**
 * 是否正在刷新 Token
 */
let isRefreshing = false;

/**
 * 核心请求封装
 * 支持自动携带基础 Header、HTTP 401 自动重试
 */
async function request<T = any>(options: UniApp.RequestOptions & { showLoading?: boolean }): Promise<T> {
  if (options.showLoading) ui.loading();

  const appStore = useAppStore();

  const performRequest = (currentToken: string, currentOpenid: string): Promise<T> => {
    const header = {
      'Content-Type': 'application/json',
      'x-wx-openid': currentOpenid,
      'x-wx-appid': getAppId(),
      ...(currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {}),
      ...options.header,
    };

    return new Promise((resolve, reject) => {
      uni.request({
        timeout: 15000,
        ...options,
        header,
        success: async (res) => {
          if (options.showLoading) ui.hideLoading();

          const { statusCode, data } = res;

          // 1. 成功处理 (2xx)
          if (statusCode >= 200 && statusCode < 300) {
            resolve(data as T);
            return;
          }

          // 2. 授权失效处理 (401)
          if (statusCode === 401) {
            if (!isRefreshing) {
              isRefreshing = true;
              try {
                // 获取最新 openid
                const newOpenid = await getOpenid();
                // 注意：如果此处需要用 openid 换取新 token，请在此处补充逻辑
                const newToken = appStore.token;

                // 执行队列
                retryQueue.forEach((callback) => callback(newToken));
                retryQueue = [];

                // 重试当前请求
                resolve(await performRequest(newToken, newOpenid));
              } catch (error) {
                appStore.logout();
                ui.toast('认证失败，请重新进入');
                reject(error);
              } finally {
                isRefreshing = false;
              }
            } else {
              // 正在刷新中，挂起当前请求
              resolve(new Promise((resolveRetry) => {
                retryQueue.push((newToken) => {
                  resolveRetry(performRequest(newToken, appStore.openid));
                });
              }));
            }
            return;
          }

          // 3. 其他错误处理
          const msg = (data as any)?.msg || (data as any)?.message || `请求失败(${statusCode})`;
          ui.toast(msg);
          reject(res);
        },
        fail: (err) => {
          if (options.showLoading) ui.hideLoading();
          ui.toast('网络连接超时或失败');
          reject(err);
        },
      });
    });
  };

  return performRequest(appStore.token, appStore.openid);
}

/**
 * 获取用户 OpenID
 */
export async function getOpenid() {
  const appStore = useAppStore();
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
              appStore.setOpenid(data.openid);
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
    url: `${BASE_URL}/api/list`,
    method: 'GET',
  });
}
