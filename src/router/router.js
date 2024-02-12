import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'
import { useAuth } from "@store/useAuth"
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import NotFound from '../views/NotFound.vue'
import Alternative from '../views/Alternative.vue'
import Default from '../layouts/Default.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: Default
      },
      beforeEnter: (to, from, next) => {
        const userStore = useAuth()
        const isAuth = computed(() => userStore.auth)
        
        if (!isAuth.value && to.name !== 'welcome') {
          next( { name: "welcome" })
        } else {
          next()
        }
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        layout: Default
      }
    },
    {
      path: '/alternative',
      name: 'alternative',
      component: Alternative,
      meta: {
        layout: Default
      }
    },
    { // 404 notFound - Routes' Matching Syntax
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      
    },
  ]
})

// Another way
router.beforeEach((to, from, next) => {
  const userStore = useAuth()
  const isAuth = computed(() => userStore.auth)

  if (isAuth.value && to.name === 'welcome') {
    next( { name: "home" })
  } else {
    next()
  }
})

export default router
