import { DefaultTheme } from 'vitepress';

const baseUrl = '/web/vue';

const vue$sidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Vue基础', link: `${baseUrl}/Vue基础` },
  {
    text: 'Vue进阶',
    collapsed: true,
    items: [
      { text: '使用冻结对象提升效率', link: `${baseUrl}/使用冻结对象提升效率` },
      { text: 'Vue3学习记录', link: `${baseUrl}/Vue3学习记录` }
    ]
  }
];

export default vue$sidebar;
