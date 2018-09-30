/* import Cookies from 'js-cookie' */
const Token = 'Admin-Token'
const sessionId = 'sessionId'


export function getLocalStorage(name) {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : '';
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