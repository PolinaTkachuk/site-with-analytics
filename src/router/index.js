import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from "@/components/SignUpForm.vue";
import MainPage from "@/components/MainPage.vue";
import AuthForm from "@/components/AuthForm.vue";
import Recommendations from "@/components/Recommendations.vue"
import Profile from "@/components/Profile.vue";

const routes = [
  {
    path: '/RegisterUsers',
    component: SignUpForm,
  },
  {
    path: '/MainPage',
    component: MainPage,
  },
  {
    path: '/MainPage/Profile',
    component: Profile,
  },
  {
    path: '/AuthUsers',
    component: AuthForm,
  },

  {
    path: '/MainPage/Recommendations',
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
