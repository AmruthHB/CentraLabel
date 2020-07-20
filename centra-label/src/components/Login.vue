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
            <label for="username">Username</label>
            <input type="text" id="username">
          </div><br>

          <div class="form-field">
            <label for="password">Password</label>
            <input type="password" id="password">
          </div><br>


          <div class="form-field">
            <button class="btn-large waves-effect waves-dark" style="width:100%;">Login</button>
          </div><br>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
  .login {
    padding-top: 90px;
    padding-left: 20%;
    padding-right: 20%;
  }

</style>
