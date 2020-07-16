import Vue from 'vue'
import Router from 'vue-router'
import LabelUI from '@/components/LabelUI'
import Annotations from '@/components/Annotation'
import test from '@/components/test'
import Box from '@/components/Box'
import Dataset from '@/components/Dataset'
import Upload from '@/components/Upload'


Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/Annotations',
    name: 'Annotations',
    component: Annotations
  },
    {
      path: '/LabelUI',
      name: 'LabelUI',
      component: LabelUI
    },
   

    {
      path: '/Dataset',
      name: 'Dataset',
      component: Dataset


    },
    {
      path: '/UploadDataset',
      name: "Upload",
      component: Upload


    }
  ]
})
