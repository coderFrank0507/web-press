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
      { text: 'Vue', link: '/vue/测试' }
    ],

    sidebar: {
      '/vue/': [
        {
          text: 'Vue记录',
          items: [
            { text: '测试', link: '/vue/测试' },
            { text: '学习记录', link: '/vue/Vue3学习记录' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyright © 2024-present Frank'
    }
  }
});
