import { defineConfig } from 'vitepress';
import { URL_basic, URL_network, URL_react, URL_vue, URL_flutter, URL_engineering } from './base_url';
import sidebar_basic from './sidebar/basic';
import sidebar_engineering from './sidebar/engineering'
import sidebar_vue from './sidebar/vue';
import sidebar_react from './sidebar/react';
import sidebar_network from './sidebar/network';
import sidebar_flutter from './sidebar/flutter';
import ViteConfig from './vite-config';
import NavConfig from './nav';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/vite-press-docs/',
  head: [['link', { rel: 'icon', href: '/img/favicon.ico' }]],
  title: 'Frank',
  description: '持续学习，无限进步',
  themeConfig: {
    logo: '/img/logo.png',
    outline: { label: '目录', level: [2, 6] },
    nav: NavConfig,

    sidebar: {
      [URL_basic]: sidebar_basic,
      [URL_engineering]: sidebar_engineering,
      [URL_vue]: sidebar_vue,
      [URL_react]: sidebar_react,
      [URL_network]: sidebar_network,
      [URL_flutter]: sidebar_flutter,
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/frankwang0507' },
    //   {
    //     icon: {
    //       svg: '<svg t="1734460807454" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4237" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4238"></path></svg>'
    //     },
    //     link: 'https://gitee.com/coderwyf'
    //   }
    // ],

    footer: {
      copyright: 'Copyright © 2024-present Frank'
    }
  },
  markdown: {
    lineNumbers: true
  },

  vite: ViteConfig
});
