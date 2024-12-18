import { DefaultTheme } from 'vitepress';

const baseUrl = '/web/js-ts';

const js_ts$sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '优化',
    collapsed: true,
    items: [{ text: '首页白屏问题', link: `${baseUrl}/首页白屏问题` }]
  },
  {
    text: '手写EventBus',
    link: `${baseUrl}/手写EventBus`
  }
];

export default js_ts$sidebar;
