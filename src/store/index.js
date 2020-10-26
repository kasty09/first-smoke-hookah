import Vue from 'vue'
import Vuex from 'vuex'
import { getStructStore } from './store.js'
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store(getStructStore())
}
