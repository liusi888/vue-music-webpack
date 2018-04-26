import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLayLoad from 'vue-lazyload'
import './common/stylus/index.styl'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLayLoad, {
  loading: './common/images/default.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
