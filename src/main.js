// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(Vuex)

const ajax = axios.create({
  baseURL: window.location.hostname === 'localhost'  ?  'http://176.103.210.111/admin/' : 'https://admin.scene.ae/',
  headers: {'content-type': 'application/json'}
});

const store = new Vuex.Store({
  state: {
    authState: 0
  },
  mutations: {
      authUser (){
      //  document.cookie = 'userName=Vasya';
        store.authState = 1
        // alert(document.cookie);
      }
  }
});

router.beforeResolve((to, from, next) => {
  if(to.name === 'Login'){
    if(store.authState === 1){
      next('/');
    }
  }else{
    if(store.authState !== 1){
      next('/pages/login');
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  data(){
    return{
      token: 0,
      authState: 0,
      authUser: 0,
      authRole: 0,
      ajax
    };
  },
  methods:{
  },
  components: {
    App
  }
})
