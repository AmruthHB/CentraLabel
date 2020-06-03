<template>
  <div id="app">
    <Navbar />
    <router-view><Home /> </router-view>
  </div>
</template>

<script>
import LabelUI from '@/components/LabelUI'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components:{
    LabelUI,Navbar
  }
 
}
</script>

<style>

</style>
