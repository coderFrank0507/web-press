import { DefaultTheme } from 'vitepress';
import { BASE_URL_js_ts } from '../base_url';

const sidebar_js_ts: DefaultTheme.SidebarItem[] = [
  {
    text: '事件循环（渡一）',
    link: `${BASE_URL_js_ts}/事件循环（渡一）`
  },
  {
    text: '手写EventBus',
    link: `${BASE_URL_js_ts}/手写EventBus`
  },
  {
    text: '手写Promise',
    link: `${BASE_URL_js_ts}/手写Promise`
  },
  {
    text: '常用工具函数',
    link: `${BASE_URL_js_ts}/常用工具函数`
  },
  {
    text: '迭代器-Iterator',
    link: `${BASE_URL_js_ts}/迭代器-Iterator`
  },
  {
    text: '生成器-Generator',
    link: `${BASE_URL_js_ts}/生成器-Generator`
  },
  {
    text: '优化',
    collapsed: false,
    items: [
      { text: '首页白屏问题', link: `${BASE_URL_js_ts}/首页白屏问题` },
      { text: '并发请求', link: `${BASE_URL_js_ts}/并发请求` },
    ]
  }
];

export default sidebar_js_ts;
