import { DefaultTheme } from 'vitepress';
import { URL_flutter } from '../base_url';

const sidebar_flutter: DefaultTheme.SidebarItem[] = [
  {
    text: 'Dart基础',
    collapsed: false,
    items: [
      { text: '安装', link: `${URL_flutter}/安装` }
    ]
  }
];

export default sidebar_flutter;
