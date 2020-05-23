<template>
  <div class="container">
    <div class = "row center title"> 
      <h4>Centra Label</h4>

    </div>

  <div class="row">
    <div class="col s8 center">
      <h5>Image </h5>
      <Annotation />
    </div>

    <div class = "col s4 center ">
      <h5>My Annotations</h5>
    <div class="label-box">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
    </div>


  </div>


    
  </div>
</template>

<script>

import Annotation from './Annotation'
import Box from './Box'

export default {
  name: 'Home',
  components: {
    Annotation:Annotation,
    Box:Box
  },
  data () {
    return {
      currentCoords: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  margin-bottom: 50px;
}
  .label-box{
    height: 50vh;
    overflow-y: scroll;
  }
</style>
