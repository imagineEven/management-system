const Mock = require('mockjs');
import mockparse from '../parse.js'

class UserInfo {
  constructor() {
    this.init();
  };

  getUserInfo(config) {
    // what datas are user need? 
    let param = mockparse.param2Obj(config)
    let localId = JSON.parse(param.data).localId;
    let userInfo = mockparse.parseUserInfo(localId, this.userInfoMap)
    return { data: userInfo };
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

  logout(config) {
    return {name: '退出'}
  }

  init() {
    this.userMap = {
      even: {
        roles: ['even'],
        token: "even",
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      other: {
        roles: ['other'],
        token: "other",
        introduction: '我是Other',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'other'
      }
    }
    this.userInfoMap = [
      {
        localId: 'even',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['even']
      },
      {
        localId: 'other',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['user']
      }
    ]
  }
}

let userInfo = new UserInfo()
export {
  userInfo
}