<template>
<div class="container dataset-render">
   <div class="row">
    
      <div class="card">
        <div class="card-image">
          <img class = "thumbnail" src="https://i.pinimg.com/originals/e6/ea/44/e6ea443b8249d0fdaaba7af2d5f1850d.png">
        </div>
        <div class = "row center">
         <h5>Card Title</h5>
        </div>
        <div class="row center">

        <div v-for="set in datasets" class="card-action" v-bind:key="set">
          <a @click='click(set)' class="waves-effect waves-light btn">{{set}}</a>
        </div>
        </div>
      </div>
   
  </div>
  <p> </p>


</div>
  
</template>

<script>
import storage from '@/firebase/storageInit'
import db from '@/firebase/firestoreInit'


export default {
   data: function () {
      return {
        datasets: null
      }
   },
   methods: {
     click: function(name) {
       console.log(name)
     }
   },
   created: async function () {
     let user = this.$store.state.username
     let temp = await db.collection("users").doc(user).get()
     this.datasets = temp.data().datasets
     console.log(this.datasets)
   }
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

</style>