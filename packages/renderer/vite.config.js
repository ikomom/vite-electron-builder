/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import vue from '@vitejs/plugin-vue';
import {renderer} from 'unplugin-auto-expose';
import {join} from 'node:path';
import {injectAppVersion} from '../../version/inject-app-version-plugin.mjs';
import {Vuetify3Resolver} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import VueMacros from 'unplugin-vue-macros/vite';

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      },
    }),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
    injectAppVersion(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      // '@vueuse/core'
      imports: ['vue', 'vue/macros', 'vue-router'],
      dts: './types/auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: join(PACKAGE_ROOT, './.eslintrc-auto-import.json'), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './types/components.d.ts',
      resolvers: [Vuetify3Resolver()],
    }),
  ],
};

export default config;
