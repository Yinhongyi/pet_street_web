/*eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  hasUpdateFeature: false,
  hasUpdateCharacteristic: false,
  hasUpdateShapes: false,
  featureList: [],
  characteristicList: [],
  shapesList: [],
}

const mutations = {
  updateFeatureList (state, list) {
    state.featureList = list;
    state.hasUpdateFeature = true;
  },
  updateCharacteristicList (state, list) {
    state.characteristicList = list;
    state.hasUpdateCharacteristic = true;
  },
  updateShapesList (state, list) {
    state.shapesList = list;
    state.hasUpdateShapes = true;
  },
}

export default new Vuex.Store({
  state,
  mutations,
})
