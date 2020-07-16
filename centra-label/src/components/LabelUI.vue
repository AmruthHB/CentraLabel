<template>
  <div class="container">
    <div class="row center title">
      <h4>Centra Label</h4>

    </div>

    <div class="row">
      <div class="col s8 center">
        <h5>Image </h5>
        <Annotation ref="konvaComp" />
      </div>

      <div class="col s4 center ">
        <h5>My Annotations</h5>
        <div class="label-box">
          <div class="card" v-for="a in renderCollection" :key="a.id">
            <div class="card-content">

              <div class="row center">
              <div class="input-field">
              <input v-model="label" placeholder="Label" type="text" class="center label validate">
              </div>
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
          <button class="btn waves-effect waves-light " name="action">
            <i class="material-icons right">arrow_back</i>
          </button>


        </div>

        <div class="col s6">
          <!-- On click event listener here -->
          <button class="btn waves-effect waves-light" type="submit" name="action">
            <i class="material-icons left">arrow_forward</i>
          </button>


        </div>




      </div>

    </div>



  </div>
</template>

<script>
  import Annotation from './Annotation'
  import Box from './Box'
  import db from '@/firebase/firestoreInit'
  


  export default {
    name: 'LabelUI',
    components: {
      Annotation: Annotation,
      Box: Box
    },
    data() {
      return {
        renderCollection: []
      }
    },

    methods: {
      destroyBox: function (item, itemId) {
        console.log(itemId)
        this.$refs.konvaComp.deleteBox(itemId)

      }

    },

    created() {

      let currentReference = db.collection("Test-Set").doc("1").onSnapshot((doc) => {

        let imageInfo = doc.data().Annotations
        let iterKeys = Object.keys(imageInfo)

        this.renderCollection = []
        for (let i = 0; i < iterKeys.length; i++) {

          let informationObj = {
            "id": Object.keys(imageInfo)[i],
            "coords": imageInfo[iterKeys[i]].boundingBox
          }

          this.renderCollection.push(informationObj)
        }

      })

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin-bottom: 50px;
  }

  .label-box {
    height: 40vh;
    overflow-y: scroll;
    margin-bottom: 80px;
  }

  /*  */

  

</style>
