import { DefaultTheme } from 'vitepress';

const baseUrl = '/web/js-ts';

const js_ts$sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '手写EventBus',
    link: `${baseUrl}/手写EventBus`
  },
  {
    text: '手写Promise',
    link: `${baseUrl}/手写Promise`
  },
  {
    text: '常用工具函数',
    link: `${baseUrl}/常用工具函数`
  },
  {
    text: '优化',
    collapsed: false,
    items: [{ text: '首页白屏问题', link: `${baseUrl}/首页白屏问题` }]
  }
];

export default js_ts$sidebar;
