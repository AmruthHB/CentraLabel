import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Annotations from '@/components/Annotation'
import test from '@/components/test'
import Box from '@/components/Box'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
