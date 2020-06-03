<template>
  <div >
  <div class="card" v-for = "c in allCoords" :key = "c.id" >
    <div class="card-content">

      <div class="row center">
        <input v-model = "label" placeholder="Label"  type="text" class="center label validate">
      </div>

      <div class="row center">
        <div class="col s6">
          <p>X1: {{c.xyCoords[0]}}</p>
          <p>X2: {{c.xyCoords[1]}} </p>
        </div>

        <div class="col s6 center">
          <p>Y1: {{c.xyCoords[2]}} </p>
          <p>Y2: {{c.xyCoords[3]}}</p>
        </div>
      </div>

      <div class="row center">
        <button class="btn red" >Delete</button>
      </div>
    </div>

  </div>
  </div>


</template>

<script>

  import {mapGetters} from 'vuex';
  


  export default {
  name: "Box",
  computed: mapGetters(["allCoords"]),
  data : {
      label: ""
    },

  methods:{


  }

  }

</script>

<style scoped>

div .label{
  width: 20%;
}

</style>
