import { DefaultTheme } from 'vitepress';
import { BASE_URL_vue, BASE_URL_vue_source } from '../base_url';

const sidebar_vue: DefaultTheme.SidebarItem[] = [
  { text: 'Vue基础', link: `${BASE_URL_vue}/Vue基础` },
  { text: 'Diff算法', link: `${BASE_URL_vue}/Diff算法` },
  { text: 'vue3.5更新了哪些新功能', link: `${BASE_URL_vue}/vue3.5更新了哪些新功能`},
  { text: 'ElementPlus颜色工具', link: `${BASE_URL_vue}/ElementPlus颜色工具` },
  {
    text: 'Vue进阶',
    collapsed: false,
    items: [
      { text: '使用冻结对象提升效率', link: `${BASE_URL_vue}/使用冻结对象提升效率` },
      { text: 'Proxy比defineProperty到底好在哪', link: `${BASE_URL_vue}/Proxy比defineProperty到底好在哪` }
    ]
  },
  {
    text: '源码篇',
    collapsed: false,
    items: [
      { text: '框架搭建', link: `${BASE_URL_vue_source}/框架搭建` }
    ]
  }
];

export default sidebar_vue;
