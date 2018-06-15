/* import Cookies from 'js-cookie' */

const Token = 'Admin-Token'
const sessionId = 'sessionId'

export function getToken() {
  return localStorage.getItem(Token)
}

export function setToken(token) {
  return localStorage.setItem(Token, token)
}

export function removeToken() {
  return localStorage.removeItem(Token)
}

export function getSessionId() {
  return localStorage.getItem(sessionId)
}

export function setSessionId(mySessionId) {
  return localStorage.setItem(sessionId, mySessionId)
}

export function removeSessionId() {
  return localStorage.removeItem(sessionId)
}
