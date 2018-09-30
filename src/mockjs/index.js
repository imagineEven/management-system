
const Mock = require('mockjs');
import { userInfo } from './modules/login.js'



// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)

Mock.mock(/\/user\/info\.*/, 'get', '{"niaho": "111"}')

Mock.mock(/\/api\/user\/signIn/, 'post', userInfo.signIn.bind(userInfo))
Mock.mock(/\/user\/signUp/, 'post', userInfo.signUp)