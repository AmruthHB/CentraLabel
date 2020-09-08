<template>


  <!-- File drag and drop, access file format  -->
  <!-- Dataset Storage Name  -->
  <div class="container form">

    <div class="row center">
      <h5>Upload a Dataset</h5>
    </div>
  <div class="row">
    <div class="col s6 ">
      <label for="first_name">Dataset Name</label>
      <input v-model = "datasetName"  placeholder="Name" id="first_name" type="text" class="validate">

    </div>

    <div class="col s6 ">
      <label for="price">Price ($CAD)</label>
      <input v-model = "bountyOffer"  placeholder="Price" id="price" type="number" class="validate">
    </div>
  </div>
  
    <div class = "choosers">
       <label>Status</label>
              <p>
                <label class = "pubpriv">
                  <input value = "public" v-model = "datasetStatus" class="with-gap" name="group1" type="radio" />
                  <span>Public</span>
                </label>

                <label class = "pubpriv" >
                  <input value = "private" v-model = "datasetStatus" class="with-gap" name="group1" type="radio" />
                  <span>Private</span>
                </label>
            
              </p>

            </div>
      <div class = "choosers">
       <label>Task type</label>
              <p>
                <label class = "status">
                  <input value = "annotation" v-model = "taskType" class="with-gap" name="group2" type="radio" />
                  <span>Annotate</span>
                </label>

                <label class = "status" >
                  <input value = "labelling" v-model = "taskType" class="with-gap" name="group2" type="radio" />
                  <span>Label</span>
                </label>
            
              </p>

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
      <div>
      <a @click= "runOrder()" class="waves-effect waves-light btn"><i class="material-icons left">cloud_upload</i>Upload</a>
      </div>

    </div>

    <div class="row center" v-if = 'showProgress === true'>
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
      bountyOffer: 0,
      datasetStatus: "",
      taskType: "",
      showProgress: false,
      uploadData: [],
      dataFormat: [],
      storageRef :storage.ref()
      }
    },

    methods: {
      //takes in normal seperated data, as well as zip files. grabs the actual files as wells as the file extensions for upload
      assignData:function(event){
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

      runOrder:function(){
        this.createDataset()
        this.createBucket()
        this.createInfo()
        this.addtoCreator()

      }

      ,createDataset:function(){
        
        this.showProgress = true
        if(this.datasetName === ""){
          this.datasetName = `${ID()}-Dataset`
        }
        //check and account for zips

        if(this.dataFormat.length === 1 && this.dataFormat[0] === "zip"){

        }else{
          for(let i = 0; i < this.uploadData.length;i++){
            let upload = this.uploadData[i]
            this.storageRef.child(`${this.datasetName}/${(i+1).toString()}.${this.dataFormat[i]}`).put(upload)
            console.log(`${this.datasetName}/${(i+1).toString()}.${this.dataFormat[i]}`)
          }
          this.showProgress = false
      }
      },

      createBucket:async function(){
        let newBucket = db.collection(this.datasetName)

        for(let i = 0;i < this.uploadData.length;i++){
          newBucket.doc((i+1).toString()).set({
            Annotations: {},
            filePath: `${this.datasetName}/${i+1}.${this.dataFormat[i]}`,
            renderList: []
          }).then(function(){

            newBucket.doc("Current_Image").set({
              fileName: "1"
            })
          })
        }
      },
      createInfo: async function(){
        let datasetInfo = {
          name: this.datasetName,
          bounty:this.bountyOffer,
          images: this.dataFormat.length,
          status: this.datasetStatus,
          task: this.taskType,
          user:this.$store.state.username,
          labels:[]
        }
        let newBucket = await db.collection('public-datasets').doc(this.datasetName).set(datasetInfo)

        
      },
      addtoCreator: async function () {
        const datasetRef = db.collection('public-datasets').doc(this.datasetName)
        const user = db.collection("users").doc(this.$store.state.username)


        const retrieve = await user.get()
        let userData = retrieve.data().datasets
        userData.push(datasetRef)
        
        const updateUser = await user.update({datasets:userData})
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

  .pubpriv{
    margin-left: 20%;
  }

  .status{
     margin-left: 20%;
  }
  

</style>
