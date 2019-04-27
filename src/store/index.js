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
  hasUpdateVaccinesOrder: false,
  hasUpdateExpParasiteOrder: false,
  hasUpdateGuarantee: false,
  hasUpdateDeliveryType: false,
  featureList: [],
  characteristicList: [],
  shapesList: [],
  gradeList: [],
  vaccinesOrderList: [],
  expParasiteOrderList: [],
  guaranteeList: [],
  deliveryTypeList: [],
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
  updateVaccinesOrder (state, list) {
    state.vaccinesOrderList = list;
    state.hasUpdateVaccinesOrder = true;
  },
  updateExpParasiteOrder (state, list) {
    state.expParasiteOrderList = list;
    state.hasUpdateExpParasiteOrder = true;
  },
  updateGuarantee (state, list) {
    state.guaranteeList = list;
    state.hasUpdateGuarantee = true;
  },
  updateDeliveryType (state, list) {
    state.deliveryTypeList = list;
    state.hasUpdateDeliveryType = true;
  },
}

export default new Vuex.Store({
  state,
  mutations,
})
