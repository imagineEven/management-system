const Mock = require('mockjs');
import mockparse from '../parse.js'

class UserInfo {
  constructor() {

    this.userMap = this.init();
  };

  getUserInfo(config) {
    return config;
  }

  signIn(config) {
    let username = mockparse.parseSignIn(config)
    if (this.userMap[username]) {
      return this.userMap[username] 
    } else {
      return {}
    }
  }

  signUp() {

  }

  init() {
    return {
      even: {
        roles: ['even'],
        tocken: `even${Math.random()*100}`,
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      other: {
        roles: ['other'],
        tocken: `other${Math.random()*100}`,
        introduction: '我是Other',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'other'
      }
    }
  }
}

let userInfo = new UserInfo()
export {
  userInfo
}