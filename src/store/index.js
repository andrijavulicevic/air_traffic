import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
// import axios from 'axios'

Vue.use(Vuex)

const state = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
  lastDv: ''
}
const getters = {
  getData: state => state.data,
  loading: state => state.loading,
  loaded: state => state.loaded,
  error: state => state.error,
  getLastDv: state => state.lastDv
}
const mutations = {
  setData: (state, data) => {
    state.data = data
  },
  setLoaded: (state, flag) => {
    state.loaded = flag
  },
  toggleLoading: (state) => {
    state.loading = !state.loading
  },
  setError: (state, error) => {
    state.error = error
  },
  setLastDv: (state, lastDv) => {
    state.lastDv = lastDv
  }
}
const actions = {
  loadData ({commit}, params) {
    commit('toggleLoading')
    jsonp(
      `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${params.lat}&lng=${params.lng}&fDstL=0&fDstU=100&ldv=${state.lastDv}`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
          commit('toggleLoading')
          commit('setLoaded', false)
        } else {
          commit('setData', data)
          commit('setLastDv', data.lastDv)
          commit('toggleLoading')
          commit('setLoaded', true)
        }
      })
  },
  updateData ({commit}, params) {
    jsonp(
      `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${params.lat}&lng=${params.lng}&fDstL=0&fDstU=100&ldv=${state.lastDv}`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
        } else {
          commit('setData', data)
          commit('setLastDv', data.lastDv)
          commit('setError', null)
        }
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
