import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "@iconscout/unicons/css/line.css"
import axios from 'axios';
import "bootstrap";
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const options = {
  // You can set your default options here
};


Vue.use(Toast, options);


new Vue({
  router,
  render: h => h(App),
  provide:{
    globalVariable:{
      colors:{
        color_1:'#284F67',
        color_2:'#8C7FAB',
        color_3:'#008774'
      }
    }
  }
}).$mount('#app')
