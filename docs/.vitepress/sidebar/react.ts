import { DefaultTheme } from 'vitepress';
import { URL_react } from '../base_url';

const sidebar_react: DefaultTheme.SidebarItem[] = [
  {
    text: 'React基础',
    collapsed: false,
    items: [
      { text: 'React18 Hooks API', link: `${URL_react}/react18-hooks-api` }
    ]
  }
];

export default sidebar_react;
