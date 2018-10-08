class MockParse {
  constructor() {

  }

  parseUserInfo(localId, userInfoMap) {
    let newUserInfo = userInfoMap.filter(item => {
      return item.localId === localId;
    })
    return newUserInfo[0];
  }

  parseSignIn(config) {
    let username = JSON.parse(config.body).username;
    return username
  }

  param2Obj(config) {
    let url = config.url;
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

  // parseParam(config) {
  //   debugger
  //   let url = config.url;
  //   let jsonArr = url.split('=');
  //   let json = jsonArr[1];
  //   console.log(JSON.parse(json));
  //   debugger
  //   let data = JSON.parse(json);
  //   console.log(data);
  //   return data.localId;
  // }
}

let mockParse = new MockParse();

export default mockParse;
