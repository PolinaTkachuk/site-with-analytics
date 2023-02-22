import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from "@/components/SignUpForm.vue";
import MainPage from "@/components/MainPage.vue";
import AuthForm from "@/components/AuthForm.vue";

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
    path: '/AuthUsers',
    component: AuthForm,
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
    next('/login')
  } else {
    next()
  }
})*/
export default router
