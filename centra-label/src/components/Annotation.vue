<template>
<div class="container center">
  <v-stage ref="stage" :config="stageSize" @mouseup = "update">
    <v-layer ref="background" @click= "drawBox">
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

const width = window.innerWidth;
const height = window.innerHeight;

export default {

  
  data() {
    return {
      stageSize: {
        width: 2,
        height: 2
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


  created() {
    const image = new window.Image();
    image.src = "https://konvajs.org/assets/yoda.jpg";
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
    this.clickCounter = 0
    this.stageSize['height'] = image.height
    this.stageSize['width'] = image.width
    //console.log(storage.child("/Test-Dataset").listAll())
  },
  methods: {
    drawBox() {
      var mousePos = this.$refs.stage.getStage().getPointerPosition();
      var x_mouse = mousePos.x;
      var y_mouse = mousePos.y;
      //console.log("x:" + x_mouse, "y:" + y_mouse)    
      if (this.clickCounter == 0) {
        this.clickCounter ++;
        this.keyPoints[0] = [x_mouse, y_mouse]
      }
      else if (this.clickCounter == 1) {
          //saving second point of click
        this.keyPoints[1] = [x_mouse, y_mouse]
        this.rect1 = new Konva.Rect({
          x: this.keyPoints[0][0],
          y: this.keyPoints[0][1],
          width: this.keyPoints[1][0] - this.keyPoints[0][0],
          height: this.keyPoints[1][1] - this.keyPoints[0][1],
          fill: 'transparent',
          stroke: 'black',
          draggable: true,
          name: this.boxes.length.toString()
      });
        this.tr1 = new Konva.Transformer({
          nodes: [this.rect1],
          centeredScaling: false,
          rotateEnabled: false,
          resizeEnabled: true,
          anchorStroke: 'white',
          anchorFill: 'blue',
          anchorSize: 9,
          borderEnabled: false,
          ignoreStroke: true,
          keepRatio: true,
          borderStroke: 'black'
    });
      this.boxes.push(this.rect1)
      this.transformers.push(this.tr1)

      //updating layer to include the new transformer
      this.$refs.annotation.getNode().add(this.tr1);

      //resetting global variables
      this.keyPoints = ["foo","foo"]
      this.clickCounter = 0;
      
      this.annotationCoordinates.push([
        this.rect1.getClientRect().x,
        this.rect1.getClientRect().y,
        this.rect1.getClientRect().x + this.rect1.getClientRect().width,
        this.rect1.getClientRect().y + this.rect1.getClientRect().height
      ])
      console.log(this.annotationCoordinates)
      //adding rectangle and updating the canvas
      this.$refs.annotation.getNode().add(this.rect1);
      this.$refs.annotation.getNode().draw();
      }
      },

      update () {
        //console.log(this.boxes[i])
        for (let i = 0; i < this.boxes.length; i++) {
          this.annotationCoordinates[i] = [
          this.boxes[i].getClientRect().x,
          this.boxes[i].getClientRect().y,
          this.boxes[i].getClientRect().x + this.boxes[i].getClientRect().width,
          this.boxes[i].getClientRect().y + this.boxes[i].getClientRect().height
          ]
        } 
      },
      deleteBox() {
        //using array indexes to delete boxes
        this.boxes[this.boxes.length-1].destroy()
        this.transformers[this.transformers.length -1].detach()
        
        //removing the individual elements from the array
        this.boxes.pop(); this.transformers.pop()

        //refreshing the layer
        this.annotations.draw();
      }
  }
};
</script>