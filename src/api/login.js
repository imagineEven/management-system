import request from '@/utils/request'
import apis from '@/utils/apis'

export function login(username, password) {
  return request({
    url: apis.STORE_LOGIN_NORMAL,
    method: 'post',
    data: {
      Data: JSON.stringify(
        {
          username,
          password,
          sessionId: null
        }
      )
    }
  })
}

export function getInfo(sessionId) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { sessionId }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
