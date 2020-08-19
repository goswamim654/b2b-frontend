import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}login`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}register`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.data)
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    resendOTP({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}resendOTP`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    verifyOTP({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}verifyotp`, data: user, method: 'POST' })
        .then(resp => {
          //console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    profileUpdate({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}profileUpdate`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          // const token = resp.data.token
          // const user = resp.data.user
          // localStorage.setItem('token', token)
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          // commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getProfile({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}profile`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
