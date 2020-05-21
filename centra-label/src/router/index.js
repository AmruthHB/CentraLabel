import Vue from 'vue'
import Router from 'vue-router'
import Annotations from '@/components/Annotation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Annotation',
      component: Annotations
    }
  ]
})
