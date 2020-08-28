import Vue from 'vue'
import Router from 'vue-router'

import {Annotation,LabelUI} from '@/components/AnnotateApi'
import {Login,RegisterUser} from '@/components/SignIn'
import {Dataset,MyDatasets,Upload} from '@/components/UserMenu'
import firebase from 'firebase'
import "firebase/auth";
import auth from '@/firebase/authInit'


Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterUser
    },
    {
      path: '/mydatasets',
      name: 'mydatasets',
      component: MyDatasets,
      meta: { requiresAuth: true }
    },
    {
      path: '/dataset',
      name: 'Dataset',
      component: Dataset,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  console.log(isAuthenticated)
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }


});


export default router;