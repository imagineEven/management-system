
const Mock = require('mockjs');
import { userInfo } from './modules/login.js'
import { table } from './modules/table.js'



// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)  /user/info

Mock.mock(/\/user\/info\.*/, 'get', userInfo.getUserInfo.bind(userInfo))
Mock.mock(/\/api\/user\/signIn/, 'post', userInfo.signIn.bind(userInfo))
Mock.mock(/\/user\/logout/, 'post', userInfo.logout.bind(userInfo))
Mock.mock(/\/api\/table\/list/, 'get', table.getTableList.bind(table))