import { DefaultTheme } from 'vitepress';
import { URL_engineering } from '../base_url';

const sidebar_engineering: DefaultTheme.SidebarItem[] = [
  {
      text: '工程化',
      collapsed: false,
      items: [
        { text: '工程化概述', link: `${URL_engineering}/工程化概述` }
      ]
    }
];

export default sidebar_engineering;

