import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import TodoPage from '../views/TodoPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/todo/:id',
      name: 'todo',
      props: true,
      component: TodoPage
    }
  ]
})

export default router
