import Vue from "vue";
import Vuex from "vuex";
import annotations from "./modules/annotations";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 modules: {
    annotations

 }

});