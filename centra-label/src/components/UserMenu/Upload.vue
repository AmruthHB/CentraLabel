<template>


  <!-- File drag and drop, access file format  -->
  <!-- Dataset Storage Name  -->
  <div class="container form">

    <div class="row center">
      <h5>Upload a Dataset</h5>
    </div>

    <div class="row ">
      <label for="first_name">Dataset Name</label>
      <input v-model = "datasetName"  placeholder="Placeholder" id="first_name" type="text" class="validate">

    </div>

    <div class="row">
      <label>Filename</label>
      <div class="file-field input-field">

        <div class="btn">
          <span>Add Dataset</span>
          <input @change = "assignData" type="file" multiple>
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>


    </div>

    <div class="row center">

      <a   @click= "runOrder()" class="waves-effect waves-light btn"><i class="material-icons left">cloud_upload</i>Upload</a>

    </div>

    <div class="row center" v-if = 'showProgress'>
      <div class="progress">
      <div class="indeterminate"></div>
  </div>
        
    </div>

  </div>

</template>

<script>
import storage from '@/firebase/storageInit'
import db from '@/firebase/firestoreInit'
import {ID} from "@/database-scripts/randomString.js"

  export default {
    data() {
      return{
      datasetName: "",
      showProgress: false,
      uploadData: [],
      dataFormat: [],
      storageRef :storage.ref()
      }
    },

    methods: {
      //takes in normal seperated data, as well as zip files. grabs the actual files as wells as the file extensions for upload
      assignData(event){
        ///prototype: assume that all data types can be unzipped, actual product add promises for error handling
        
        let recieved = event.target.files
        for(let file in recieved){
            if(Number.isInteger(parseInt(file))){
              this.uploadData.push(recieved[file])
              let extension = recieved[file]["name"].split(".").pop()
              this.dataFormat.push(extension)
            }
        }
        console.log(this.uploadData[this.uploadData.length-1])
        
      },

      runOrder(){
        this.createDataset()
        this.createBucket()

      }

      ,createDataset(){
        
        this.showProgress = true
        if(this.datasetName === ""){
          this.datasetName = `${ID()}-Dataset`
        }
        //check and account for zips

        if(this.dataFormat.length === 1 && this.dataFormat[0] === "zip"){

        }else{
          for(let i = 0; i < this.uploadData.length;i++){
            let upload = this.uploadData[i]
            this.storageRef.child(`${this.datasetName}/image${(i+1).toString()}.${this.dataFormat[i]}`).put(upload)
          }
          this.showProgress = false
      }
      },

      createBucket(){
        let newBucket = db.collection(this.datasetName)

        for(let i = 0;i < this.uploadData.length;i++){
          newBucket.doc((i+1).toString()).set({
            Annotations: {},
            filePath: `${this.datasetName}/${i+1}.${this.dataFormat[i]}`
          }).then(function(){

            newBucket.doc("Current_Image").set({
              fileName: "1"
            })
          })
        }
      }
    }

  }

</script>
<style scoped>
  .form {
    width: 30%;
    margin-left: 35%;
    margin-right: 35%;
  }

</style>
