/**
 * 全局业务类型定义
 */

/** 基础 API 返回结构 */
export interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}

/** 分页返回结构 */
export interface PageResult<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** 用户信息基础结构 */
export interface UserInfo {
  id: string | number;
  nickname: string;
  avatar: string;
  openid?: string;
  gender?: number;
  city?: string;
  province?: string;
  country?: string;
}

/** 通用列表项 */
export interface ListItem {
  id: string | number;
  title: string;
  desc?: string;
  icon?: string;
  [key: string]: any;
}
