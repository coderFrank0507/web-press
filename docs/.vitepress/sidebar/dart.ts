import { DefaultTheme } from 'vitepress';
import { BASE_URL_dart } from '../base_url';

const sidebar_dart: DefaultTheme.SidebarItem[] = [
  {
    text: 'Dart基础',
    collapsed: false,
    items: [
      { text: '安装', link: `${BASE_URL_dart}/安装` }
    ]
  }
];

export default sidebar_dart;
