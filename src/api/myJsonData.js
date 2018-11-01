import { resolve } from "uri-js";

export function login(username, password) {
  return new Promise(resolve => {
    let data = {
      roles: ['even'],
      token: "even",
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
    resolve(data)
  })
}

export function getInfo(localId) {
  return new Promise(resolve => {
    let data = {
      data: {
        localId: 'even',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['even']
      }
    }
    resolve(data)
  })
}

export function logout() {
  return new Promise(resolve => {
    let data = {}
    resolve()
  })
}

export function getList() {
  return new Promise(resolve => {
    let tableList = [
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
    resolve(tableList)
  })
}
