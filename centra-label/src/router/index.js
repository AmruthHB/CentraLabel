import Vue from 'vue'
import Router from 'vue-router'

import {Annotation,LabelUI} from '@/components/AnnotateApi'
import {Login,RegisterUser} from '@/components/SignIn'
import {Dataset,MyDatasets,Upload} from '@/components/UserMenu'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Log',
      name: 'Login',
      component: Login
    },
    {
      path: '/Reg',
      name: 'Register',
      component: RegisterUser
    }

    
 
  ]
})


