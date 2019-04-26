/*eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  loading: false,
  hasUpdateFeature: false,
  hasUpdateCharacteristic: false,
  hasUpdateShapes: false,
  hasUpdateGrade: false,
  featureList: [],
  characteristicList: [],
  shapesList: [],
  gradeList: [],
}

const mutations = {
  changeLoading (state, boolean) {
    state.loading = boolean;
  },
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
  updateGradeList (state, list) {
    state.gradeList = list;
    state.hasUpdateGrade = true;
  },
}

export default new Vuex.Store({
  state,
  mutations,
})
