<template>
  <div>
    <div class="row center title">
      <h4>Centra Label</h4>

    </div>

    <div class="row">
      <div class="col s2 center ">
         <div class="card label-choose">
        <div class="row center">
          <h5>Label </h5>
        </div>
        <div class="row ">
          <div class = "offset-s2 col s8">
            <select v-model="chosenLabel" class="browser-default">
              <option value="" disabled selected>Label</option>
              <option :value = "label" v-for = "(label,index) in labels" :key = index>{{label}}</option>
              <!--<option value="bobby">Bobby</option>
              <option value="bob">Bob</option>-->
            </select>


          </div>
          
          </div>
          <div v-if="chosenLabel === ''" class="row center">
          <p class = "red-text">{{'No label chosen!'}}</p>
        </div>
        </div>
      </div>

      <div class="col s8 center image-area ">
       <div class="row center">
          <h5>Image </h5>
        </div>
        <div class="row center grey lighten-4">
          <Annotation ref="konvaComp"  :useLabel = "chosenLabel" :key="componentKey" />
        </div>


      </div>


      <div class="col s2 center ">
        <h5>My Annotations</h5>
        <div class="label-box" ref="labelbox">
          <div class="card " v-for="a in renderCollection" :key="a.id">
            <div class="card-content">


            <div class = "row">
              <p> {{a.class}} </p>
            </div>

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
          <button class="btn waves-effect waves-light " name="action" @click=changeImage(back)>
            <i class="material-icons right">arrow_back</i>
          </button>


        </div>

        <div class="col s6">
          <!-- On click event listener here -->
          <button class="btn waves-effect waves-light" type="submit" name="action" @click=changeImage(forwards)>
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
  import {
    ID
  } from "@/database-scripts/randomString.js"

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
        event_listener: null,
        chosenLabel:"",
        labels: [],
        
      }
    },
    async beforeMount() {
      const userData = await db.collection("users").doc(this.$store.state.username).get()
      const currentWorkingDataset = userData.data().currentWorkingDataset
      this.datasetName = currentWorkingDataset
      
      //
      const datasetDetails = await db.collection("public-datasets").doc(currentWorkingDataset).get()
      this.labels = datasetDetails.data().labels
      //console.log(this.labels)
      //console.log(this.datasetName)
      const currentWorkingFileReference = await db.collection(this.datasetName).doc("Current_Image").get()
      const currentWorkingFile = currentWorkingFileReference.data().fileName
      //console.log(currentWorkingFile)

      this.event_listener = db.collection(this.datasetName).doc(currentWorkingFile).onSnapshot((doc) => {
        let renderList = doc.data().renderList
        this.renderCollection = []
        //console.log(doc.data())

        for (let i = 0; i < renderList.length; i++) {
          let iter_Annotation = doc.data().Annotations[renderList[i]]
          //console.log(iter_Annotation.class)
          let informationObj = {
            "id": renderList[i],
            "coords": iter_Annotation.boundingBox,
            "class":iter_Annotation.class
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
                "coords": iter_Annotation.boundingBox,
                "class":iter_Annotation.class
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

  .label-choose{
    padding-bottom: 5%;
  }

  

</style>
