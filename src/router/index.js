import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { 
      requiresAuth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  //base: '/mukesh/b2b/',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
