import presetWeapp from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
import { presetIcons, defineConfig } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      whRpx: false,
    } as any),
    // attributify autocomplete
    presetWeappAttributify() as any,
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      customizations: {
        customize(props, data, name) {
          if (name === 'lucide:heart') {
            data.body = data.body.replace('fill="none"', 'fill="currentColor"');
          }
          return props;
        },
      },
    }),
  ],
  shortcuts: [
    {
      center: 'flex justify-center items-center',
      col: 'flex flex-col',
      'col-center': 'flex flex-col items-center justify-center',
      'row-between': 'flex items-center justify-between',
      'card-base': 'bg-white rounded-2xl p-4 shadow-sm',
      'text-main': 'text-slate-800 text-base font-medium',
      'text-sub': 'text-slate-400 text-sm',
      'btn': 'flex items-center justify-center gap-2 block p-4 bg-slate-100 text-slate-600 font-bold rounded-full transition-all active:scale-95',
    },
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }) as any,

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass() as any,
  ],
  rules: [
    [
      /^overflow(-[xy])?-(auto|scroll)$/, 
      ([, axis, type]) => ({
        [axis ? `overflow${axis}` : 'overflow']: type,
        '-webkit-overflow-scrolling': 'touch',
      }),
    ],
    [
      /^max-h-([\d_.]+)rem$/, 
      ([, value]) => ({
        'max-height': `${value.replace('_', '.')}rem`,
      }),
    ],
    ['bg-primary/5', { 'background-color': 'var(--primary-5)' }],
    ['bg-primary_5', { 'background-color': 'var(--primary-5)' }],
    ['bg-primary/10', { 'background-color': 'var(--primary-10)' }],
    ['bg-primary_10', { 'background-color': 'var(--primary-10)' }],
    ['bg-primary/20', { 'background-color': 'var(--primary-20)' }],
    ['bg-primary_20', { 'background-color': 'var(--primary-20)' }],
    ['bg-primary/30', { 'background-color': 'var(--primary-30)' }],
    ['bg-primary_30', { 'background-color': 'var(--primary-30)' }],
    ['bg-primary/80', { 'background-color': 'var(--primary-80)' }],
    ['bg-primary_80', { 'background-color': 'var(--primary-80)' }],
    ['shadow-primary/30', { '--un-shadow-color': 'var(--primary-30)' }],
    ['shadow-primary_30', { '--un-shadow-color': 'var(--primary-30)' }],
    ['border-primary/10', { 'border-color': 'var(--primary-10)' }],
    ['border-primary_10', { 'border-color': 'var(--primary-10)' }],
    ['border-primary/20', { 'border-color': 'var(--primary-20)' }],
    ['border-primary_20', { 'border-color': 'var(--primary-20)' }],
    ['shadow-primary/10', { '--un-shadow-color': 'var(--primary-10)' }],
    ['shadow-primary_10', { '--un-shadow-color': 'var(--primary-10)' }],
  ],
  theme: {
    colors: {
      // 基础颜色，直接引用 CSS 变量
      primary: 'var(--primary)',
      success: 'var(--success)',
      warning: 'var(--warning)',
      error: 'var(--error)',
      'lucky-from': 'var(--lucky-from)',
      'lucky-to': 'var(--lucky-to)',
      white: '#ffffff',
    },
    // 文本颜色
    textColor: {
      base: '#1e293b',
      disabled: '#999999',
    },
    // 边框颜色
    borderColor: {
      base: '#f1f5f9',
      primary: 'var(--primary)',
    },
    // 背景颜色
    backgroundColor: {
      base: '#f4f7fa',
    },
  },
});
