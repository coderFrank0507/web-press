import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vite-press-docs/',
  head: [['link', { rel: 'icon', href: '/vite-press-docs/img/favicon.ico' }]],
  title: 'Frank的文档',
  description: '无限进步',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/img/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyright © 2024-present Frank'
    }
  }
});
