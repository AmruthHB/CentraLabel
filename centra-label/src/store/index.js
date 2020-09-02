import Vue from "vue";
import Vuex from "vuex";

 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        loggedIn: false,
        username: "",
        userType: "",
        annotationData: {
            loadState: true,
            dataset_name: ""
        }
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
        changePageLoadState (state, status) {
            state.annotationData.loadState = status
        },
        setDatasetName (state, name) {
            state.annotationData.dataset_name = name
        }
    }
});