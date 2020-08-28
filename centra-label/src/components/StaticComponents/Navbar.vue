<template>
<!---Just a future componet to interface with logins so that users can access their data and such -->
  <nav>
    <div class="nav-wrapper">
      <a v-if = "$store.state.loggedIn" href="#/dataset" class="brand-logo">user: {{$store.state.username}}</a>
      <a v-else href="#/login" class="brand-logo"> CentraLabel</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a @click = "logout()">Logout</a></li>
        
      </ul>
    </div>
  </nav>
</template>

<script>
import auth from '@/firebase/authInit'
import firebase from 'firebase'

export default {
  methods: {
    logout: async function() {
      if (this.$store.state.loggedIn) { 
        try {
        auth.signOut()
         alert("Logged Out!")
         this.$store.commit('logOut')
         this.$router.push('/login')
      }
       catch (error) {
         alert(error.message)
      };
      }
      else {
        alert("You are not logged in!")
      }

      
    }
  }
}

</script>

<style>

</style>