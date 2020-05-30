import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Annotations from '@/components/Annotation'
import test from '@/components/test'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Annotations',
      component: Annotations
    }
  ]
})
