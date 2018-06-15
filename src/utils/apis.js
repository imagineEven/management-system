const apis = {
  // 公用
  STORE_LOGIN_NORMAL: 'store/system/storeAdminManage/loginNormal.do', // 门店端管理员登录
  STORE_RE_LOGIN: 'store/system/storeAdminManage/reLogin.do', // 门店管理员重登录
  STORE_LOGOUT: 'store/system/storeAdminManage/logout.do', // 门店端管理员退出
  MOD_PWD: 'store/system/storeAdminManage/modPwd.action', // 门店管理员修改密码
  CLEAR_CACHE: 'store/system/storeAdminManage/clearCache.do', // 清除缓存
  GET_AREA_LIST: 'area/getAreaList.do', // 获取所有地区列表
  UPLOAD_IMG: 'file/upload/uploadImg.do', // 上传图片
  STORE_DETAIL: 'store/detail.action', // 获取门店详情
  STORE_SAVE: 'store/save.action', // 修改门店信息

  // 门店
  // 客户管理
  GET_AGE_RANGE_LIST: 'store/customer/buyerManage/getAgeRangeList.do', // 获取年龄范围列表信息
  MOD_BUYER: 'store/customer/buyerManage/modBuyer.action', // 修改客户信息
  DEL_BUYER: 'store/customer/buyerManage/delBuyer.action', // 删除客户
  GET_BUYER_LIST: 'store/customer/buyerManage/getBuyerList.action', // 获取客户列表信息
  GET_BUYER_INFO: 'store/customer/buyerManage/getBuyerInfo.action', // 获取客户详情
  GET_BUYER_INTEGRAL_INFO: 'store/customer/buyerManage/getBuyerIntegralInfo.action', // 获取客户积分明细
  GET_BUYER_COUPON_INFO: 'store/customer/buyerManage/getBuyerCouponInfo.action', // 获取客户优惠券明细
  GET_BUYER_EXCLUSIVE_PRIVILEGE_INFO: 'store/customer/buyerManage/getBuyerExclusivePrivilegeInfo.action', // 获取客户专属特权列表
  MOD_BUYER_EXCLUSIVE_PRIVILEGE: 'store/customer/buyerManage/modBuyerExclusivePrivilege.action', // 修改客户专属特权
  // 客户关怀管理
  CUSTOMER_CARE_SAVE: 'customerCare/save.action', // 新增或保存客户关怀
  CUSTOMER_CARE_QUERY_LIST: 'customerCare/queryList.action', // 查询客户关怀列表
  CUSTOMER_CARE_QUERY: 'customerCare/query.action', // 查询客户关怀详情
  // 关怀模板
  CUSTOMER_CARE_QUERY_TEMPLATE_LIST: 'customerCare/queryTemplateList.action', // 查询客户关怀模板列表
  CUSTOMER_CARE_QUERY_TEMPLATE: 'customerCare/queryTemplate.action', // 查询客户关怀模板详情

  // 客户心愿
  CUSTOMERCARE_QUERYWISHCONFIG: 'customerCare/queryWishConfig.action', // 查询客户心愿配置
  CUSTOMERCARE_UPDATEWISHCONFIG: 'customerCare/updateWishConfig.action', // 设置户心愿配置
  CUSTOMERCARE_UPDATEWISH: 'customerCare/updateWish.action', // 设置户心愿
  CUSTOMERCARE_QUERYWISH: 'customerCare/queryWish.action', // 查询客户心愿
  CUSTOMERCARE_QUERYWISHLIST: 'customerCare/queryWishList.action', // 查询客户心愿列表

  // 商品管理
  // 商品管理
  GET_GOODS_DROP_DOWN_LIST: 'store/goods/goodsManage/getGoodsDropDownList.action', // 搜索获取商品下拉列表信息
  GET_GOODS_KEY_VALUES: 'store/goods/goodsManage/getGoodsKeyValues.action', // 门店端获取商品属性组合
  ADD_GOODS: 'store/goods/goodsManage/addGoods.action', // 添加商品
  MOD_GOODS: 'store/goods/goodsManage/modGoods.action', // 修改商品
  DEL_GOODS: 'store/goods/goodsManage/delGoods.action', // 删除商品
  GET_GOODS_LIST: 'store/goods/goodsManage/getGoodsList.action', // 获取商品列表信息
  GET_GOODS_INFO: 'store/goods/goodsManage/getGoodsInfo.action', // 获取商品详情
  MOD_GOODS_SHELF_STATE: 'store/goods/goodsManage/modGoodsShelfState.action', // 修改商品上架状态
  MOD_GOODS_RECOMMEND: 'store/goods/goodsManage/modGoodsRecommend.action', // 修改商品推荐状态
  GET_GOODS_SKU_LIST: 'store/goods/goodsManage/getGoodsSkuList.action', // 获取商品sku列表信息
  ADD_GOODS_JOIN_SECKILL: 'store/goods/goodsManage/addGoodsJoinSecKill.action', // 添加商品参与秒杀
  CANCEL_GOODS_JOIN_SECKILL: 'store/goods/goodsManage/cancelGoodsJoinSecKill.action', // 取消商品参与秒杀
  QUERY_SECKILL_INFO: 'store/goods/goodsManage/querySecKillInfo.action', // 获取秒杀信息
  DEL_SKU: 'store/goods/goodsManage/delSku.action', // 删除商品sku
  // 商品模板管理
  GET_GOODS_TEMPLATE_LIST: 'store/goods/goodsTemplateManage/getGoodsTemplateList.action', // 获取商品模板列表信息
  GET_GOODS_TEMPLATE_INFO: 'store/goods/goodsTemplateManage/getGoodsTemplateInfo.action', // 获取商品模板详情
  // 商品属性管理
  ADD_GOODS_ATTRIBUTE: 'store/goods/goodsAttributeManage/addGoodsAttribute.action', // 门店端添加商品属性
  GET_GOODS_ATTRIBUTE_LIST: 'store/goods/goodsAttributeManage/getGoodsAttributeList.action', // 门店端获取商品属性列表
  MOD_GOODS_ATTRIBUTE_STATUS: 'store/goods/goodsAttributeManage/modGoodsAttributeStatus.action', // 门店端修改商品属性状态
  DEL_GOODS_ATTRIBUTE: 'store/goods/goodsAttributeManage/delGoodsAttribute.action', // 门店端删除商品属性
  GET_GOODS_ATTRIBUTE_INFO: 'store/goods/goodsAttributeManage/getGoodsAttributeInfo.action', // 门店端获取商品属性详情
  MOD_GOODS_ATTRIBUTE: 'store/goods/goodsAttributeManage/modGoodsAttribute.action', // 修改商品属性
  // 商品分类管理
  GET_CATEGORY_DROP_DOWN_LIST: 'store/goods/goodsCategoryManage/getStoreCategoryDropList.action', // 搜索获取商品类目下拉列表信息
  ADD_GOODS_CATEGORY: 'store/goods/goodsCategoryManage/addNewGoodsCategory.action', // 门店端添加商品类目
  MOD_GOODS_CATEGORY: 'store/goods/goodsCategoryManage/modNewGoodsCategory.action', // 门店端修改商品类目
  DEL_GOODS_CATEGORY: 'store/goods/goodsCategoryManage/delNewGoodsCategory.action', // 门店端删除商品类目
  GET_GOODS_CATEGORY_LIST: 'store/goods/goodsCategoryManage/getNewGoodsCategoryList.action', // 门店端获取商品类目列表信息
  GET_GOODS_CATEGORY_INFO: 'store/goods/goodsCategoryManage/getNewGoodsCategoryInfo.action', // ，门店端获取商品类目详情
  GET_GOODS_CATEGORY_TREE_LIST: 'store/goods/goodsCategoryManage/getGoodsCategoryTreeList.action', // 门店端获取商品类目树形结构列表信息

  // 交易管理
  // 订单相关
  GET_ORDER_LIST: 'store/order/orderManage/getOrderList.action', // 获取订单列表信息
  GET_ORDER_INFO: 'store/order/orderManage/getOrderInfo.action', // 获取订单详情
  SEARCH_PICKUP_INFO: 'store/order/orderManage/searchPickUpInfo.action', // 搜索取货信息
  PICKUP: 'store/order/orderManage/pickUp.action', // 取货
  GET_PAYMENT_INFO: 'store/order/orderManage/getPaymentInfo.action', // 获取收款信息
  CONFIRM_PAYMENT: 'store/order/orderManage/confirmPayment.action', // 确认收款
  SET_RECEIVING_GOODS_TYPE: 'store/order/orderManage/setReceivingGoodsType.action', // 付款成功设置收货方式
  GET_POST_INFO: 'store/order/orderManage/getPostInfo.action', // 获取用户默认的邮寄/发货信息
  CONFIRM_POST: 'store/order/orderManage/confirmPost.action', // 确认邮寄/发货
  // 现场下单
  SEARCH_SKU: 'store/order/siteOrderManage/searchSku.action', // 根据商品sku编码搜索商品sku
  CREATE_DRAFT_ORDER: 'store/order/siteOrderManage/createDraftOrder.action', // 创建订单草稿
  SITE_ORDER: 'store/order/siteOrderManage/siteOrder.action', // 现场下单
  SEARCH_USERBY_PHONE: 'store/order/siteOrderManage/searchUserByPhone.action', // 根据手机号搜索用户信息
  SET_ORDER_POST_ADDRESS: 'store/order/siteOrderManage/setOrderPostAddress.action', // 设置订单邮寄地址，获取订单邮费和订单实付价格
  CAL_CARRIAGE: 'store/order/siteOrderManage/calCarriage.action', // 根据省份计算邮费
  CANCEL_ORDER: 'store/order/siteOrderManage/cancelOrder.action', // 取消订单
  // 业绩导出
  GET_ACHIEVEMENT_LIST: 'store/order/achievementManage/getAchievementList.action', // 获取业绩列表信息
  EXPORT_ACHIEVEMENT: 'store/order/achievementManage/exportAchievement.action', // 业绩导出

  // 促销管理
  // 促销管理
  PROMOTION_QUERY: 'promotion/query.action', // 查询促销详情
  PROMOTION_SAVE: 'promotion/save.action', // 新建或者修改促销
  PROMOTION_QUERY_LIST: 'promotion/queryList.action', // 促销活动列表
  PROMOTION_QUERY_PROMOTION_STATUS: 'promotion/queryPromotionStatus.action', // 促销状态code
  PROMOTION_SUSPEND_OR_RESTART: 'promotion/suspendOrReStart.action', // 暂停或者重新开始促销活动
  PROMOTION_ENROLL_UNIFIED_ACTIVITY: 'promotion/enrollUnifiedActivity.action', // 报名参加统一促销活动
  PROMOTION_CANCEL_ENROLLED: 'promotion/cancelEnrolled.action', // 取消报名
  PROMOTION_QUERY_ACTIVITY_GOODS_LIST: 'promotion/queryActivityGoodsList.action', // 参与活动的商品
  PROMOTION_QUERY_ACTIVITY_GOODS_CODE_LIST: 'promotion/queryActivityGoodsCodeList.action', // 参与活动的商品或类目code
  PROMOTION_PROMOTION_CAL: 'promotion/promotionCal.action', // 订单促销优惠计算
  PROMOTION_QUERY_ORDER_PROMOTION: 'promotion/queryOrderPromotion.action', // 查询订单促销优惠
  PROMOTION_QUERY_STORE_ACTIVITY_LIST: 'promotion/queryStoreActivityList.action', // 获取活动
  PROMOTIION_PUSH_TO_WEIXIN: 'promotion/pushToWeixin.action', // 推送到微信

  // 促销素材管理
  PROMOTION_TEMPLATE_QUERY_LIST: 'promotionTemplate/queryList.action', // 促销素材列表
  PROMOTION_TEMPLATE_QUERY: 'promotionTemplate/query.action', // 促销素材详情

  // 系统管理
  // 导航管理
  GET_NAVIGATION_LIST: 'store/system/navigationManage/getNavigationList.action', // 获取导航栏列表
  GET_NAVIGATION_BACKGROUND_LIST: 'store/system/navigationManage/getNavigationBackgroundList.action', // 获取导航栏背景色列表信息
  ADD_NAVIGATION: 'store/system/navigationManage/addNavigation.action', // 添加导航栏列表信息
  MOD_NAVIGATION: 'store/system/navigationManage/modNavigation.action', // 修改导航栏列表信息
  DEL_NAVIGATION: 'store/system/navigationManage/delNavigation.action', // 删除导航栏列表信息
  GET_NAVIGATION_INFO: 'store/system/navigationManage/getNavigationInfo.action', // 获取导航栏详情
  // 优惠券管理
  GET_COUPON_LIST: 'store/system/couponManage/getCouponList.action', // 获取优惠券列表
  ADD_COUPON: 'store/system/couponManage/addCoupon.action', // 添加优惠券
  MOD_COUPON: 'store/system/couponManage/modCoupon.action', // 修改优惠券
  DEL_COUPON: 'store/system/couponManage/delCoupon.action', // 删除优惠券
  GET_COUPON_INFO: 'store/system/couponManage/getCouponInfo.action', // 获取优惠券详情
  // Banner图管理
  GET_BANNER_LIST: 'store/system/bannerManage/getBannerList.action', // 获取banner列表
  ADD_BANNER: 'store/system/bannerManage/addBanner.action', // 添加banner
  DEL_BANNER: 'store/system/bannerManage/delBanner.action', // 删除banner
  MOD_BANNER: 'store/system/bannerManage/modBanner.action', // 修改banner
  GET_BANNER_INFO: 'store/system/bannerManage/getBannerInfo.action', // 获取banner详情
  MOD_BANNER_STATUS: 'store/system/bannerManage/modBannerStatus.action', // banner关闭或启用
  // 统计
  GET_SKU_SELLING_STATISTICS: 'store/system/statisticsManage/getSkuSellingStatistics.action', // 获取门店商品销售统计列表信息
  GET_STORE_SALES_VOLUME: 'store/system/statisticsManage/getStoreSalesStatistics.action', // 获取门店销售统计列表信息
  // 运费设置
  GET_CARRIAGE_INFO: 'store/system/carriageManage/getCarriageInfo.action', // 获取运费信息
  MOD_CARRIAGE_INFO: 'store/system/carriageManage/modCarriageInfo.action', // 修改运费信息
  // 主题色管理
  GET_STORE_THEME_LIST: 'store/system/themeManage/getStoreThemeList.action', // 获取门店主题色列表信息
  MOD_STORE_THEME_INFO: 'store/system/themeManage/modStoreThemeInfo.action', // 修改门店主题色信息
  // 积分规则
  GET_INTEGRAL_RULE_INFO: 'store/system/integralManage/getIntegralRuleInfo.action', // 获取积分规则信息
  MOD_INTEGRAL_RULE_INFO: 'store/system/integralManage/modIntegralRuleInfo.action', // 修改积分规则信息
  // 会员等级管理
  ADD_VIP_LEVEL: 'store/system/vipLevelManage/addVipLevel.action', // 添加会员等级
  MOD_VIP_LEVEL: 'store/system/vipLevelManage/modVipLevel.action', // 修改会员等级
  DEL_VIP_LEVEL: 'store/system/vipLevelManage/delVipLevel.action', // 删除会员等级
  GET_VIP_LEVEL_LIST: 'store/system/vipLevelManage/getVipLevelList.action', // 获取会员等级列表信息
  GET_VIP_LEVEL_INFO: 'store/system/vipLevelManage/getVipLevelInfo.action', // 获取会员等级详情
  // 门店店员管理
  ADD_STORE_ADMIN: 'store/system/storeAdminManage/addStoreAdmin.action', // 添加门店店员
  MOD_STORE_ADMIN: 'store/system/storeAdminManage/modStoreAdmin.action', // 修改门店店员
  DEL_STORE_ADMIN: 'store/system/storeAdminManage/delStoreAdmin.action', // 删除门店店员
  GET_STORE_ADMIN_LIST: 'store/system/storeAdminManage/getStoreAdminList.action', // 获取门店店员列表
  GET_STORE_ADMIN_INFO: 'store/system/storeAdminManage/getStoreAdminInfo.action', // 获取门店店员详情
  GET_AUTHORITY_TREE: 'store/system/storeAdminManage/getAuthorityTree.action', // 获取门店店员权限树形结构

  // 查询用户关注有礼已选择的奖品
  STORE_WEIXIN_SUBCRIBE_QUERY: 'weixinSubcribe/query.action',
  // 保存用户关注有礼选择的奖品
  STORE_WEIXIN_SUBCRIBE_CONFIG: 'weixinSubcribe/config.action'
}

export default apis
