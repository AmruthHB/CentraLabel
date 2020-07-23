<template>
<div class="container center">
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="background" @mousedown= "drawBox">
      <v-image :config="{
            image: image
          }"/>
    </v-layer>
        <v-layer ref="annotation"></v-layer>
  </v-stage>
  </div>
</template>

<script>
//konva graphics library
import Vue from 'vue';
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

//database and storage references for firebase
import db from '@/firebase/firestoreInit'
import storage from '@/firebase/storageInit'

//getLink - retrieve HTTPS url given storage filepath
//getInfo - Get most recently edited image in dataset and return the respective filepath/annotation object for that filepath
import {getLink, getInfo} from '@/database-scripts/fetchHandler.js'
import {updateImageAnnotation, addImageAnnotation, deleteElement} from '@/database-scripts/updateHandler.js'

//randomly generate a 10 character string
import {ID} from "@/database-scripts/randomString.js"


//placeholders
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
      konvaObjects: {},
      clickCounter: 0,
      keyPoints: ["foo","foo"],
      rect1: null,
      tr1: null,
      currentImageReference: null
      };
  },
  async beforeMount() {

    //create an imageObject
    const image = new Image();
    console.log("Reset")
    //prototype directory
    let datasetDirectory = "Test-Set"

    //retrieve annotation object and url object
    let currentData = await getInfo(datasetDirectory)

    //annotation object and url object links
    let currentAnnotations = currentData.annotationObject
    let currentImage = currentData.link

    //get https url and set it to image source
    image.src = await getLink(currentImage)
    
    //load image
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
      this.stageSize['height'] = image.height
      this.stageSize['width'] = image.width
    };
    
    //bboxObj is the 10 string random ID for each bounding box, the key corresponds to the properties ...
    // 'boundingBox' - an object with x_min, y_min and so on
    //'class' - the class of the image
    for (let bboxObj in currentAnnotations) {

      this.rect1 = new Konva.Rect({
          x: currentAnnotations[bboxObj]['boundingBox']['x_min'],
          y: currentAnnotations[bboxObj]['boundingBox']['y_min'],
          width: currentAnnotations[bboxObj]['boundingBox']['x_max'] - currentAnnotations[bboxObj]['boundingBox']['x_min'],
          height: currentAnnotations[bboxObj]['boundingBox']['y_max'] - currentAnnotations[bboxObj]['boundingBox']['y_min'],
          fill: 'transparent',
          stroke: 'black',
          draggable: true,
          id: bboxObj
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

      this.konvaObjects[bboxObj] = {
        transformerObj: this.tr1,
        rectangleObj: this.rect1
      }
      
      this.rect1.on("transformend", this.updateCoordinatesOnTransform);
      this.rect1.on("dragend", this.updateCoordinatesOnTransform); 

      this.$refs.annotation.getNode().add(this.rect1);
      this.$refs.annotation.getNode().add(this.tr1);
      this.$refs.annotation.getNode().draw();

    }
  },


  methods: {
    updateCoordinatesOnTransform(event) {
      let tempObject = {
            x_max: event.target.getClientRect().x + event.target.getClientRect().width,
            x_min: event.target.getClientRect().x,
            y_max: event.target.getClientRect().y + event.target.getClientRect().height,
            y_min: event.target.getClientRect().y
      }
      updateImageAnnotation("Test-Set", this.currentImageReference, event.target.attrs.id, tempObject)
      },

    drawBox(e) {
      var mousePos = this.$refs.stage.getStage().getPointerPosition();
      var x_mouse = mousePos.x;
      var y_mouse = mousePos.y;
      if (e.evt.ctrlKey) {
        //console.log("ctrl pressed on click!")
      }
      if (this.clickCounter == 0 && e.evt.ctrlKey) {
        this.clickCounter ++;
        this.keyPoints[0] = [x_mouse, y_mouse]
      }
      else if (this.clickCounter == 1 && e.evt.ctrlKey) {
        let randomIdentifier = ID()
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
          id: randomIdentifier
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
    
      this.rect1.on("transformend", this.updateCoordinatesOnTransform);
      this.rect1.on("dragend", this.updateCoordinatesOnTransform); 
      
      this.konvaObjects[randomIdentifier] = {
        rectangleObj: this.rect1,
        transformerObj: this.tr1
      }
      //updating layer to include the new transformer
      this.$refs.annotation.getNode().add(this.tr1);

      //resetting global variables
      this.keyPoints = ["foo","foo"]
      this.clickCounter = 0;
     
      //adding rectangle and updating the canvas
      this.$refs.annotation.getNode().add(this.rect1);
      this.$refs.annotation.getNode().draw();
      
      let temp = {
          boundingBox: {
            x_max: this.rect1.getClientRect().x + this.rect1.getClientRect().width,
            x_min: this.rect1.getClientRect().x,
            y_max: this.rect1.getClientRect().y + this.rect1.getClientRect().height,
            y_min: this.rect1.getClientRect().y
          },
          class: "cow"
      }

      addImageAnnotation("Test-Set", this.currentImageReference, randomIdentifier, temp)
      }
      },
      deleteBox(idOfImage) {
        deleteElement("Test-Set", this.currentImageReference, idOfImage)
        this.konvaObjects[idOfImage].transformerObj.detach()

        this.konvaObjects[idOfImage].rectangleObj.destroy()
        delete this.konvaObjects[idOfImage]

        this.$refs.annotation.getNode().draw();
      },
  }
};
</script>