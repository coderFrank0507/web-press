import { defineConfig } from 'vitepress';
import { URL_basic, URL_network, URL_react, URL_vue, URL_flutter, URL_next } from './base_url';
import sidebar_basic from './sidebar/basic';
import sidebar_vue from './sidebar/vue';
import sidebar_react from './sidebar/react';
import sidebar_network from './sidebar/network';
import sidebar_flutter from './sidebar/flutter';
import sidebar_next from './sidebar/next';
import ViteConfig from './vite-config';
import NavConfig from './nav';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/vite-press-docs/',
  head: [['link', { rel: 'icon', href: '/img/favicon.ico' }]],
  // title: 'F',
  description: '持续学习，无限进步',
  themeConfig: {
    // logo: '/img/logo.png',
    outline: { label: '目录', level: [2, 6] },
    nav: NavConfig,

    sidebar: {
      [URL_basic]: sidebar_basic,
      [URL_vue]: sidebar_vue,
      [URL_react]: sidebar_react,
      [URL_network]: sidebar_network,
      [URL_flutter]: sidebar_flutter,
      [URL_next]: sidebar_next
    },

    footer: {
      copyright: 'Copyright © 2024-present Frank'
    }
  },
  markdown: {
    lineNumbers: true
  },

  vite: ViteConfig
});
