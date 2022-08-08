import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// import Vuesax from 'vuesax'
// import 'vuesax/dist/vuesax.css' //Vuesax styles



// Vue.use(Vuesax, {
//     // options here
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
