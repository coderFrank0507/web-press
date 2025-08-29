import { DefaultTheme } from 'vitepress';
import { URL_network } from '../base_url';

const sidebar_network: DefaultTheme.SidebarItem[] = [
  { text: 'DNS解析的过程', link: `${URL_network}/DNS解析的过程` },
  { text: '网页被解析的过程', link: `${URL_network}/网页被解析的过程` }
];

export default sidebar_network;
