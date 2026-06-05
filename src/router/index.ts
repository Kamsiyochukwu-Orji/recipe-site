import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import RecipeDetail from '@/views/RecipeDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/categories', component: Categories },
    { path: '/categories/:name', component: CategoryDetail },
    { path: '/recipe/:id', component: RecipeDetail },
  ],
  scrollBehavior: () => ({ top: 0 })
})

export default router
