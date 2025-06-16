import { UserConfig } from 'vitepress';

const ViteConfig: UserConfig['vite'] = {
  server: {
    port: 9999,
    host: true
  }
};

export default ViteConfig;
