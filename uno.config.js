const { defineConfig } = require('unocss');
const presetMpx = require('@mpxjs/unocss-base');

const IS_WEB = process.env.MPX_CURRENT_TARGET_MODE === 'web';
// in web: 1rem -> 100px
const WEB_RATIO = 100;
// w-1 -> width: 2px
const BASE_SPACE_STEP = 2;
// if in web: 2px -> 0.02rem
// if in miniprogram: 2px -> 2rpx
const BASE_SPACE_VALUE = IS_WEB ? BASE_SPACE_STEP / WEB_RATIO : BASE_SPACE_STEP;
const UNIT = IS_WEB ? 'rem' : 'rpx';

function spacing() {
  const result = {};
  Array(750 / BASE_SPACE_STEP)
    .fill(1)
    .forEach((_, index) => (result[index + 1] = `${BASE_SPACE_VALUE * (index + 1)}${UNIT}`));
  return result;
}

module.exports = defineConfig({
  include: [/\.mpx($|\?)/],
  presets: [presetMpx()],
  theme: {
    colors: {
      primary: '#07C160',
      secondary: '#B0F6BC',
    },
    spacing: {
      ...spacing(),
    },
  },
  rules: [
    // text
    ['text-base', { 'font-size': '34rpx', 'line-height': '56rpx' }],
    ['text-sm', { 'font-size': '28rpx', 'line-height': '44rpx' }],
    ['text-xs', { 'font-size': '24rpx', 'line-height': '36rpx' }],
    ['text-h1', { 'font-size': '40rpx', 'line-height': '56rpx' }],
    ['text-h2', { 'font-size': '36rpx', 'line-height': '50rpx' }],
    ['text-h3', { 'font-size': '34rpx', 'line-height': '44rpx' }],
    ['text-large', { 'font-size': '48rpx', 'line-height': '68rpx' }],
    ['text-xl', { 'font-size': '64rpx', 'line-height': '76rpx' }],
    ['text-primary', { color: '#fff' }],
    // font
    ['font-mi', { 'font-family': 'MiSans-Regular-Mini' }],
    ['font-mi-bold', { 'font-family': 'MiSans-Bold-Mini' }],
    // bg
    [/bg-gradient/, (_, { theme }) => ({ background: `linear-gradient(to bottom, ${theme.colors.secondary} 0%, rgba(255, 255, 255, 0) 20%)` })],
    // width & height
    [/^w-(\d+)$/, ([, d], { theme }) => ({ width: theme.spacing[d] || `${IS_WEB ? d / WEB_RATIO : d}${UNIT}` })],
    [/^h-(\d+)$/, ([, d], { theme }) => ({ height: theme.spacing[d] || `${IS_WEB ? d / WEB_RATIO : d}${UNIT}` })],
    // border-radius
    [/^rounded-(\d+)$/, ([, d], { theme }) => ({ 'border-radius': theme.spacing[d] || `${IS_WEB ? d / WEB_RATIO : d}${UNIT}` })],
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'absolute-center': 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  },
});
