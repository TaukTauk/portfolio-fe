import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'instant' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/hrms',
      name: 'hrms',
      component: () => import('@/views/projects/HrmsView.vue'),
    },
    {
      path: '/projects/vispulse',
      name: 'vispulse',
      component: () => import('@/views/projects/VisPulseView.vue'),
    },
    {
      path: '/projects/ai-gateway',
      name: 'ai-gateway',
      component: () => import('@/views/projects/AiGatewayView.vue'),
    },
    {
      path: '/projects/webserv',
      name: 'webserv',
      component: () => import('@/views/projects/WebservView.vue'),
    },
    {
      path: '/projects/minishell',
      name: 'minishell',
      component: () => import('@/views/projects/MinishellView.vue'),
    },
    {
      path: '/projects/inception',
      name: 'inception',
      component: () => import('@/views/projects/InceptionView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router