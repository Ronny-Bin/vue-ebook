import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.prototype.bus = new Vue()
import '@/assets/styles/reset.css'
Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  loading: require('@/assets/img/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



