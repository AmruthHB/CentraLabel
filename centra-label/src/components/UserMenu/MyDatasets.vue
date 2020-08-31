<template>
<div class="container dataset-render">
   <div class="row center">
     <h5>My Datasets</h5>

    </div>
   <div class="row datasets">
      <!-- v for here  -->
      <div v-for = "dataset in datasets" :key = "dataset.id" class="card">

        <div class = "row center">
         <h6 class="title">{{dataset.name}}</h6>
        </div>
        <div class="row center">
        <div  class="card-action" >
          <p>Images:{{dataset.images}}</p>
          <p>Task:{{dataset.task}}</p>
           <button  class="btn-small waves-effect waves-dark" style="width:30%;">Access</button>
        </div>

        
       
        </div>
      </div>
   
  </div>
  


</div>
  
</template>

<script>
import storage from '@/firebase/storageInit'
import db from '@/firebase/firestoreInit'
import firebase from 'firebase'

export default {
   data: function () {
      return {
        datasets: []
      }
   },
   methods: {
     click: function(name) {
       console.log(name)
     }
   },

   //click, pass dataset as props into label ui
   created: async function () {
     let user = this.$store.state.username
     let userData = await db.collection("users").doc(user).get()
     let dataRefs = userData.data() //.datasets
     let userDatasets = dataRefs.datasets
     console.log(userDatasets)
     for(let i = 0; i<userDatasets.length;i++){
       let datasetLoc = userDatasets[i].path.split("/")
       let refAccess = await db.collection(datasetLoc[0]).doc(datasetLoc[1]).get()
       let refData = refAccess.data()

       
       let datasetDetails = {
         id:i,
         name:refData.name ,
         images:refData.images,
         task: refData.task
       }
       this.datasets.push(datasetDetails)
  
       }
     }


     
     //load username
     //access account
     //access dataset object
    
   }
  

</script>

<style>
.dataset-render{
    padding-top: 30px;
}

.thumbnail{
    width: 100px;
    height: 100px;
}

.datasets{
  width: 60%;

}



</style>