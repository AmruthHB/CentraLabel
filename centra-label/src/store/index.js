import Vue from "vue";
import Vuex from "vuex";

 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        loggedIn: false,
        username: "",
    },
    mutations: {
        logIn (state, name) {
            state.loggedIn = true
            state.username = name
        },
        logOut (state) {
            state.loggedIn = false
            state.username = ""
        },
    }
});