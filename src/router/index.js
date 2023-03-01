import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from "@/components/SignUpForm.vue";
import MainPage from "@/components/MainPage.vue";
import AuthForm from "@/components/AuthForm.vue";
import Recommendations from "@/components/Recommendations.vue"
import Profile from "@/components/Profile.vue";

const routes = [
  {
    path: '/register',
    component: SignUpForm,
  },
  {
    path: '/main',
    component: MainPage,
  },
  {
    path: '/main/profile',
    component: Profile,
  },
  {
    path: '/auth',
    component: AuthForm,
  },

  {
    path: '/main/recommendations',
    component: Recommendations,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/email')
  } else {
    next()
  }
})*/
export default router
