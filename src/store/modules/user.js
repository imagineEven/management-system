import { login, logout, getInfo } from '@/api/login'
/* import { getToken, setToken, removeToken, getSessionId, setSessionId, removeSessionId } from '@/utils/auth' */
import { getSessionId, setSessionId, removeSessionId, setLocalStorage } from '@/utils/auth'
const user = {
  state: {
    /* token: getToken(), */
    sessionId: getSessionId(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
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
      setLocalStorage(username, userInfo.password)
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setSessionId(data.sessionId)
          console.log(data)
          commit('SET_SESSIONID', data.sessionId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.sessionId).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            console.log(data)
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
        logout(state.sessionId).then(() => {
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          removeSessionId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_SESSIONID', '')
        removeSessionId()
        resolve()
      })
    }
  }
}

export default user
