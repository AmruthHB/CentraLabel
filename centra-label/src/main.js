// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import firebase from 'firebase'
import "firebase/auth";
import auth from '@/firebase/authInit'
import db from '@/firebase/firestoreInit'
Vue.config.productionTip = false


let app;

auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('logIn', user.email)
    async function getRole(){
      let userData = await db.collection("users").doc(user.email).get()
      return userData
      
    }
    let dataResult = getRole()
    console.log(dataResult)
    store.commit('addRole',dataResult.accountType)
    


  } else {
    store.commit('logOut')
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

