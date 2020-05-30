<template>
<div class="container center">
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="background">
      <v-image :config="{
            image: image
          }"/>
    </v-layer>
        <v-layer ref="annotation"></v-layer>
  </v-stage>
  </div>
</template>

<script>

import Vue from 'vue';
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

import db from '@/firebase/firestoreInit'
import storage from '@/firebase/storageInit'

import {getLink, getInfo} from '@/database-scripts/fetchHandler.js'
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      image: null,
      boxes: [],
      clickCounter: 0,
      keyPoints: ["foo","foo"],
      rect1: null,
      tr1: null,
      transformers: [],
      annotationCoordinates: []    
      };
  },
  async created() {
    //getInfo("Test-Set", "1")
    const image = new Image();
    let baseUrl = "Test-Dataset/2.jpg"
    image.src = await getLink(baseUrl)
    
    
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
      this.stageSize['height'] = image.height
      this.stageSize['width'] = image.width
      this.clickCounter = 0
    };


  }
};
</script>