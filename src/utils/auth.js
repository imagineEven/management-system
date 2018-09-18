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

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function setLocalStorage(name, val) {
  localStorage.setItem(name, JSON.stringify(val));
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name);
}

export function getSessionStorage(name) {
  return sessionStorage.getItem(name)?JSON.parse(sessionStorage.getItem(name)): '';
}

export function setSessionStorage(name, val) {
  sessionStorage.setItem(name, JSON.stringify(val));
}

export function removeSessionStorage(name) {
  sessionStorage.removeItem(name);
}