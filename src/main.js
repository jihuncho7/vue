import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

// Vue-Horizontal-List
import VueHorizontal from 'vue-horizontal';
Vue.use(VueHorizontal);

// Vue-Star-Rating
import StarRating from 'vue-star-rating';
Vue.component('star-rating', StarRating)

// Vue-Session
import VueSession from 'vue-session'
var sessionOptions = {
  persist:true
}
Vue.use(VueSession, sessionOptions)

// Vue-Cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { /* options */ });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// Kakao Login Javascript Key
window.Kakao.init('a20d888d737e11c1a37741b09f529cab');
