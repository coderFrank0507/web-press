import { DefaultTheme } from 'vitepress';

const NavConfig: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  {
    text: '前端',
    items: [
      { text: 'JS & TS', link: '/web/js-ts/手写EventBus' },
      { text: 'Vue', link: '/web/vue/Vue基础' },
      { text: 'React', link: '/web/react/react18-hooks-api' }
    ]
  },
  { text: '网络相关', link: '/network/DNS解析的过程' },
  { text: '个人信息', link: '/个人信息' }
]

export default NavConfig;