import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from "axios";
import router from './router';
Vue.config.productionTip = false

new Vue({
  vuetify,
    router,
  render: h => h(App)
}).$mount('#app')

let url = "http://localhost:8000/support/"; // 장고 서버 주소

axios.get(url)
    .then(function(response){
      console.log(response);
    })
    .catch(function(response){
      console.log(response);
    })