<template>
  <div class="container login">
    <div class="row">
      <div class="col s12 center">
        <div class="card">

          <div class="card-action ">
            <h5>Welcome to CentraLabel</h5>
          </div>

          <div class="card-content">
            <div class="form-field">
              <label for="email">Email</label>
              <input v-model="email" id="email" type="email" class="validate">
            </div><br>

            <div class="form-field">
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password">
            </div><br>



            <div class = "choosers">
              <p>
                <label >
                  <input value = "labeller" v-model = "role" class="with-gap" name="group1" type="radio" />
                  <span>Labeller</span>
                </label>

                <label >
                  <input value = "contractor" v-model = "role" class="with-gap" name="group1" type="radio" />
                  <span>Contractor</span>
                </label>
            
              </p>

            </div>
             


            <div class="form-field">
              <button @click="register()" class="btn-small waves-effect waves-dark red lighten-2"
                style="width:30%;">Register</button>
            
                <!-- <button @click="$router.push('/login')" class="btn-small waves-effect waves-dark  lighten-2"
                style="width:30%;">Login Page</button>-->
            </div><br>

            <div v-if="showError" class="center">
              <p class="red-text"> {{'Please check details again'}}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import auth from '@/firebase/authInit'
 import firebase from 'firebase'  
  export default {

    data: function () {
      return {
        email: '',
        password: '',
        role: '',
        showError: false,
        

      }
    },

    methods: {
      register: async function () {
        if (this.email != '' && this.password != '' && this.role != '') {
          this.showError = false
           try {
            const state = await auth.createUserWithEmailAndPassword(this.email, this.password)
            alert('Account Registered')

          } catch(error) {
            alert(error.message)
          }

        } else {
      
          this.showError = true
        }
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
  .choosers{
      margin-bottom: 10%;
  }

 

</style>
