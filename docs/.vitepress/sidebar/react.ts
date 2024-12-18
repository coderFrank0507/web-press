import { DefaultTheme } from 'vitepress';

const baseUrl = '/web/react';

const react$sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'React基础',
    collapsed: false,
    items: [
      { text: 'React18 Hooks API', link: `${baseUrl}/react18-hooks-api` },
      { text: '学习记录', link: `${baseUrl}/React18学习记录` }
    ]
  }
];

export default react$sidebar;
