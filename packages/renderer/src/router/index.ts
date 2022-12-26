import {createRouter, createWebHashHistory} from 'vue-router';
import {baseRoute} from '@/router/route';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoute],
});

export default router;
