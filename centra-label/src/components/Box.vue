<template>

  <div class="card">
    <div class="card-content">

      <div class="row center">
        <input v-model = "label" placeholder="Label"  type="text" class="center label validate">
      </div>

      <div class="row center">
        <div class="col s6">
          <p>X1: </p>
          <p>X2: </p>
        </div>

        <div class="col s6 center">
          <p>X1: </p>
          <p>X2: </p>
        </div>
      </div>

      <div class="row center">
        <button class="btn red" @click="destroy()">Delete</button>
      </div>
    </div>

  </div>


</template>

<script>
  export default {
  name: "Box",
  data : {
      label: ""
    },
  methods: {
      destroy: function(){
      
      }
  }

  }

</script>

<style scoped>

div .label{
  width: 20%;
}

</style>
