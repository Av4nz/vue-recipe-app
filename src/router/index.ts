import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AddRecipe from '@/views/AddRecipe.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'home', component: HomePage},
    {path: '/add', name: 'add', component: AddRecipe},
  ],
})

export default router
