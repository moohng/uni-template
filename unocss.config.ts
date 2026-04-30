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
    }),
    // attributify autocomplete
    presetWeappAttributify(),
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
    },
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
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
    ['bg-primary/10', { 'background-color': 'var(--primary-10)' }],
    ['bg-primary/20', { 'background-color': 'var(--primary-20)' }],
    ['bg-primary/30', { 'background-color': 'var(--primary-30)' }],
    ['bg-primary/80', { 'background-color': 'var(--primary-80)' }],
    ['shadow-primary/30', { '--un-shadow-color': 'var(--primary-30)' }],
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
