import { logout } from '@/api/login'
import { login, getInfo } from '@/api/myJsonData'

import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/local'
const user = {
  state: {
    /* token: getToken(), */
    localId: getLocalStorage('token'),
    name: 'Even',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOCALID: (state, localId) => {
      state.localId = localId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // console.log('response')
          // console.log(response)
          // console.log('response-end')
          setLocalStorage('token', response.token)
          commit('SET_LOCALID', response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.localId);
        //debugger
        getInfo(state.localId).then(response => {

          // console.log('response')
          // console.log(response)
          // console.log('responseEND')
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            console.log(state)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.sessionId).then((response) => {
          console.log('response')
          console.log(response)
          console.log('responseend')
          commit('SET_ROLES', [])
          removeLocalStorage('token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeLocalStorage('token')
        resolve()
      })
    }
  }
}

export default user
