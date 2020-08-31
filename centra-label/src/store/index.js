import Vue from "vue";
import Vuex from "vuex";

 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        loggedIn: false,
        username: "",
        userType: "",
        currentDataset:""
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
        addRole (state,role){
            state.userType = role
        },
        datasetAccessed(state,datasetRef){
            state.currentDataset = datasetRef
        }
    }
});