class MockParse {
  constructor() {

  }

  parseSignIn(config) {
    console.log('mock里面的数据')
    let username = JSON.parse(config.body).username;
    console.log(username);
    return username
  }
}

let mockParse = new MockParse();

export default mockParse;
