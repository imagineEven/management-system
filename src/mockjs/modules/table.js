const Mock = require('mockjs');
import mockparse from '../parse.js'

class Table {
  constructor() {
    this.init();
  };

  getTableList(config) {
    let param = mockparse.param2Obj(config);
    let localId = JSON.parse(param.data).localId;
    console.log(localId)
    return this.tableList.filter(item => {
      return item.userId === localId
    })[0].detail
  }

  init() {
    this.tableList = [
      {
        userId: 'even',
        detail:[
          {
            userId: 'even',
            title: '大神',
            author: 'even',
            pageviews: 'haha',
            display_time: '12'
          },
          {
            userId: 'levi',
            title: '菜鸟',
            author: 'levi',
            pageviews: 'asd',
            display_time: '34'
          },
          {
            userId: 'polo',
            title: '菜鸡',
            author: 'polo',
            pageviews: 'haha',
            display_time: '12'
          }
      ]},
      {
        userId: 'user',
        detail:[
          {
            userId: 'user',
            title: '大神',
            author: 'even',
            pageviews: 'haha',
            display_time: '12'
          }
        ]  
      }
    ]
  }
}

let table = new Table()

export {
  table
}