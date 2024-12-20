import { DefaultTheme } from 'vitepress';

const baseUrl = '/web/vue';

const vue$sidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Vue基础', link: `${baseUrl}/Vue基础` },
  { text: 'ElementPlus颜色工具', link: `${baseUrl}/ElementPlus颜色工具` },
  {
    text: 'Vue进阶',
    collapsed: false,
    items: [
      { text: '使用冻结对象提升效率', link: `${baseUrl}/使用冻结对象提升效率` },
      { text: 'Proxy比defineProperty到底好在哪', link: `${baseUrl}/Proxy比defineProperty到底好在哪` }
    ]
  }
];

export default vue$sidebar;
