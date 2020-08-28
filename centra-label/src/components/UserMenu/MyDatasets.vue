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
        <div class="card-action">
          <a class="waves-effect waves-light btn">Access</a>
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
      }
   },
   methods: {
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