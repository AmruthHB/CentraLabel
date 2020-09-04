<template>
 <div class= "container center">
     <div class = "row">
         <h5> Datasets </h5>
     </div>

      <div class = "row">
        <a @click = "$router.push('/mydatasets')"  class="waves-effect waves-light btn-large">My Dataset</a> 
     </div>

      <div v-if="role === 'contractor' " class = "row ">
        <a @click = "$router.push('/upload')"  class="waves-effect waves-light btn-large">Upload Dataset</a> 
    </div>

      <div v-if="role === 'labeller' " class = "row">
        <a class="waves-effect waves-light btn-large">My Progress</a>
    </div>

</div>
  
</template>

<script>

import Upload from "./Upload";
export default {

    Name: "Dashboard",
    data:function () {
 
        return {
            role: ""
        }
      
    },
    created(){
        this.role = this.$store.state.userType
        console.log(this.role)

    }
    

}
</script>

<style>

</style>