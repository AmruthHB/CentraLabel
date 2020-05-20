<template>
  <div class="container"></div>
</template>

<script>
import Vue from 'vue';
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
