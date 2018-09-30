const Mock = require('mockjs');

class UserInfo {
  constructor() {

  };

  getUserInfo(config) {
    return config;
  }

  signIn(config) {
    console.log(config);
    return {tocken: '123123123123', userInfo: config };
  }

  signUp() {

  }
}

let userInfo = new UserInfo()
export {
  userInfo
}