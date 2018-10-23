import request from '@/utils/request'
import apis from '@/utils/apis'

export function login(username, password) {
  //debugger
  console.log(username, password)
  return request({
    url: apis.SIGN_IN,
    method: 'post',
    data: JSON.stringify(
          {
            username,
            password,
            sessionId: null
          }
      )
  })
}

export function getInfo(localId) {
  //console.log()
  return request({
    url: apis.USER_INFO,
    method: 'get',
    params: {
      data: JSON.stringify({ localId })
    }
  })
}

export function logout() {
  return request({
    url: apis.USER_LOGOUT,
    method: 'post'
  })
}
