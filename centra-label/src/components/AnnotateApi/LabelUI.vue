<template>
  <div class="container">
    <div class="row center title">
      <h4>Centra Label</h4>

    </div>

    <div class="row">
      <div class="col s8 center">
        <h5>Image </h5>
        <Annotation ref="konvaComp" :key = "componentKey"/>
      </div>

      <div class="col s4 center ">
        <h5>My Annotations</h5>
        <div class="label-box" ref="labelbox">
          <div class="card" v-for="a in renderCollection" :key="a.id">
            <div class="card-content">



              <div class="row center">
                <div class="col s6">

                  <p>X1: {{Math.round(a.coords.x_max)}} </p>
                  <p>X2: {{Math.round(a.coords.x_min)}}</p>
                </div>

                <div class="col s6 center">
                  <p>Y1: {{Math.round(a.coords.y_max)}}</p>
                  <p>Y2: {{Math.round(a.coords.y_min)}}</p>
                </div>
              </div>

              <div class="row center">
                <button class="btn red" @click="destroyBox(a,a.id)">Delete</button>
              </div>
            </div>

          </div>




        </div>
      </div>
      <div class="row center next-back">

        <div class="col s6">
          <!-- On click event listener here -->
          <button class="btn waves-effect waves-light " name="action" @click = changeImage(back)>
            <i class="material-icons right">arrow_back</i>
          </button>


        </div>

        <div class="col s6">
          <!-- On click event listener here -->
          <button class="btn waves-effect waves-light" type="submit" name="action" @click = changeImage(forwards)>
            <i class="material-icons left">arrow_forward</i>
          </button>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Annotation from './Annotation'
  import db from '@/firebase/firestoreInit'
  import {ID} from "@/database-scripts/randomString.js"

  export default {
    name: 'LabelUI',
    components: {
      Annotation: Annotation,
      
    },
    data() {
      return {
        renderCollection: {},
        componentKey: 1,
        datasetName: null,
        currentWorkingFile: "", 
        back: "back",
        forwards: "forwards",
        event_listener: null
        }
    },
    async beforeMount() {
      const userData = await db.collection("users").doc(this.$store.state.username).get()
      const currentWorkingDataset = userData.data().currentWorkingDataset
      this.datasetName = currentWorkingDataset 

      //console.log(this.datasetName)
      const currentWorkingFileReference = await db.collection(this.datasetName).doc("Current_Image").get()
      const currentWorkingFile = currentWorkingFileReference.data().fileName
      //console.log(currentWorkingFile)

      this.event_listener = db.collection(this.datasetName).doc(currentWorkingFile).onSnapshot((doc) => {
            let renderList = doc.data().renderList
            this.renderCollection = []

            for (let i = 0; i < renderList.length; i++) {
              let iter_Annotation = doc.data().Annotations[renderList[i]]
              let informationObj = {
              "id": renderList[i],
              "coords": iter_Annotation.boundingBox
              }
            this.renderCollection.push(informationObj)
            }
      })
    },
    updated() {
      this.$refs.labelbox.scrollTop = 100000;
    },
    methods: {
      destroyBox: function (item, itemId) {
        console.log(itemId)
        this.$refs.konvaComp.deleteBox(itemId)
      },
      
      changeImage: async function (direction) {
        if (this.$store.state.annotationData.loadState === true) {
          this.$store.commit("changePageLoadState", false)
          let imageReference = await db.collection(this.datasetName).doc("Current_Image").get()
          let updateObject = {}

          if (direction === "forwards") {        
            updateObject['fileName'] = (parseInt(imageReference.data().fileName) + 1).toString()
          } else if (direction === "back" && (parseInt(imageReference.data().fileName) - 1) > 0) {
            updateObject['fileName'] = (parseInt(imageReference.data().fileName) - 1).toString()
          }
          await db.collection(this.datasetName).doc("Current_Image").update(updateObject)

          this.componentKey = ID()

          const currentWorkingFileReference = await db.collection(this.datasetName).doc("Current_Image").get()
          const currentWorkingFile = currentWorkingFileReference.data().fileName

          this.event_listener();
          this.event_listener = db.collection(this.datasetName).doc(currentWorkingFile).onSnapshot((doc) => {
                      let renderList = doc.data().renderList
                      this.renderCollection = []

                      for (let i = 0; i < renderList.length; i++) {
                        let iter_Annotation = doc.data().Annotations[renderList[i]]
                        let informationObj = {
                        "id": renderList[i],
                        "coords": iter_Annotation.boundingBox
                        }
                      this.renderCollection.push(informationObj)
                      }
                })
      } else {
        alert("Woah there buddy! Slow down! You're pressing buttons too fast, wait for things to load!")
      }
      }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin-bottom: 50px;
  }

  .label-box {
    height: 500px;
    overflow-y: scroll;
    margin-bottom: 80px;
  }

  /*  */

  

</style>
