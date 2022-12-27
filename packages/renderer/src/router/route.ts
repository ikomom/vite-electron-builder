import type {RouteRecordRaw} from 'vue-router';

export const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/clipBoard',
    component: () => import('@/pages/ClipBoard.vue'),
  },
];
