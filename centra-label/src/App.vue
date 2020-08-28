<template>
  <div id="app">
    <Navbar />
    <router-view><LabelUI/></router-view>
  </div>
</template>

<script>
import {LabelUI} from '@/components/AnnotateApi'
import {Navbar} from '@/components/StaticComponents'


export default {
  name: 'App',
  components:{
    LabelUI,Navbar
  }
 
}
</script>

<style>

</style>
