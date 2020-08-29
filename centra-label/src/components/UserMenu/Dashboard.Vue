<template>

<div class = "container">
    <!--This component allows the user to uplaod datasets to their collection of datasets as well as access their datasets-->
    <div class = "row center">
        <h5> Datasets </h5>
    </div>

     <div class = "row center">
        <a @click = "uploadMenu()"  class="waves-effect waves-light btn-large">Upload Dataset</a> 
    </div>

     <div class = "row center">
        <a @click = "$router.push('/mydatasets')" class="waves-effect waves-light btn-large">My Datasets</a>
    </div>
</div>
</template>

<script>
import Upload from "./Upload";

export default {
    Name: "Dashboard",
    methods:{
        uploadMenu: function(e){
            //route for some reason says undefined in browser yet works, check that out
            this.$router.push("/upload")
        }

    }
}
</script>




<style>

</style>