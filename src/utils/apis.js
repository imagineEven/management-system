const apis = {
  // 公用
  STORE_LOGIN_NORMAL: '/api/User/login', // 门店端管理员登录
  STORE_RE_LOGIN: 'store/system/storeAdminManage/reLogin.do', // 门店管理员重登录
  STORE_LOGOUT: 'store/system/storeAdminManage/logout.do', // 门店端管理员退出
  MOD_PWD: 'store/system/storeAdminManage/modPwd.action', // 门店管理员修改密码
  CLEAR_CACHE: 'store/system/storeAdminManage/clearCache.do', // 清除缓存
  GET_AREA_LIST: 'area/getAreaList.do', // 获取所有地区列表
  UPLOAD_IMG: 'file/upload/uploadImg.do', // 上传图片
  STORE_DETAIL: 'store/detail.action', // 获取门店详情
  STORE_SAVE: 'store/save.action', // 修改门店信息

  //Even
  SIGN_IN: '/api/user/signIn'

}

export default apis
