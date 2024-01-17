import { createRouter, createWebHistory } from 'vue-router'
// import old from '../views/old.vue'

import { useGuard } from '@authing/guard-vue3'
import { isUserLoggedIn } from '@/components/Tool.js';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('../views/DetailView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('../views/OrderView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cameraList',
      name: 'CameraList',
      component: () => import('../views/CameraList.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/callback',
      name: 'Callback',
      component: () => import('../views/Callback.vue'),
    }
    
  ]
})
// 每次切换页面都会来到的方法
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // 假设有个函数isUserLoggedIn()来判断用户是否登录，需要你自己实现
  const isLoggedIn = isUserLoggedIn(); 
  if (requiresAuth && !isLoggedIn) {// 用户未登录，需要认证的页面将重定向到登录页或者首页
    // next({ name: 'login' }); // 假设登录页面的路由名为 'login'
    const guard = useGuard()
    guard.startWithRedirect({
      state: 'some-random-string'
    })
  } else {
    // 用户已登录，或者访问不需要认证的页面，正常导航
    next();
  }
});
export default router
