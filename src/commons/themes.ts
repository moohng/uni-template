/**
 * 主题配置
 */
export interface Theme {
  id: string;
  name: string;
  color: string;
}

export const THEMES: Theme[] = [
  { id: 'classic', name: '经典', color: '#EF4444' },
  { id: 'forest', name: '深林', color: '#10B981' },
  { id: 'galaxy', name: '暗夜', color: '#8B5CF6' },
  { id: 'sakura', name: '樱花', color: '#EC4899' },
  { id: 'black', name: '极黑', color: '#0F172B' },
  { id: 'sky', name: '天空', color: '#0EA5E9' },
  { id: 'sunset', name: '日落', color: '#F97316' },
];
