import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//  createLogger是vuex的一个插件，当我们在使用的时候，会自动打印一些数据
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//  debug是一个调试工具
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
