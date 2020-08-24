<template>
<div class="container login">
  <div class="row">
    <div class="col s12 center">
      <div class="card">

        <div class="card-action ">
          <h5>Login Here </h5>
        </div>

        <div class="card-content">
          <div class="form-field">
            <label for="mail">Email</label>
            <input v-model = "mail" type="email" id="mail" class = "validate">
          </div><br>

          <div class="form-field">
            <label for="password">Password</label>
            <input v-model = "password" type="password" id="password">
          </div><br>
          
        
          <div class="form-field">
            <button @click = "login()" class="btn-small waves-effect waves-dark" style="width:30%;">Login</button>
            <button @click = "register()" class="btn-small waves-effect waves-dark red lighten-2" style="width:30%;">Register</button>
          </div><br>
        </div>
        <div v-if="showError" class="center">
              <p class="red-text"> {{'Please check details again'}}</p>
            </div>
            

      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {signIn}from '@/firebase/addUser'
  export default {
    data: function (){
      return{
        mail: '',
        password: '',
        showError: false,
       
        
      }
    },
    methods:  {
      login: function() {
         if (this.mail != '' && this.password != '' ){
           this.showError = false
           signIn(this.mail, this.password)
         }else{
           this.showError = true
           
         }
        
    },
    register: function (){
       this.$router.push("/Reg")
    }

    }

  }

</script>

<style>
  .login {
    padding-top: 90px;
    padding-left: 20%;
    padding-right: 20%;
  }

</style>
