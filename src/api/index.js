import Ajax from './ajax'
import mockAjax from './mockAjax'
// 请求三级列表数据
export const reqCategoryList=() => {
  return  Ajax({
        url:'/product/getBaseCategoryList',
        methods:'get'
    })
}
//请求da轮播页面
export const reqBannerList=() => {
  return mockAjax({
    url:'/banner',
    methods:'get'
  })
}
//请求floor页面数据
export const reqFloorList=() => {
  return mockAjax({
    url:'/floor',
    methods:'get'
  })
}
//请求search数据
export const reqSearchInfo=(searchParams) => {
  return Ajax({
    url:'/list',
    method:'post',
    data:searchParams
  })
}
//请求商品详情
export const reqDetailInfo=(skuId) => {
  return Ajax({
    url:`/item/${skuId}`,
    method:'get'
  })

}
  //请求添加购物车
  export const reqAddshop=(skuId,skuNum) => {
    return Ajax({
      url:`/cart/addToCart/${skuId}/${skuNum}`,
      method:'post'
    })
  }
 //获取购物车列表数量
 export const reqshopCartInfo=() => {
   return Ajax({
     url:'/cart/cartList',
     method:'get'
   })
 }
 //跟新单个商品状态
 export const reqUpdataOne=(skuId,isChecked) => {
   return  Ajax({
     url:`/cart/checkCart/${skuId}/${isChecked}`,
     method:'get'
   })
   //
   
 }
 //多个状态跟新
 export const reqUpdateCartCheckedAll = (isChecked,skuIds) => {
  return Ajax({
    url:`/cart/batchCheckCart/${isChecked}`,
    method:'post',
    data:skuIds
  })
}
//删除单个商品
export const reqdeleteone=(skuId) => {
  return Ajax({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}
//删除全选商品
export const reqDeleteAllCart = (skuIds) => {
  return Ajax({
    url:'/cart/batchDeleteCart',
    method:'delete',
    data:skuIds
  })
}
//请求获取验证码
// /user/passport/sendCode/{phone}
export const reqAuthCode=(phone) => {
  return Ajax({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
  })
}
//注册
export const reqRegister=(userInfo) => {
  return Ajax({
    url:'/user/passport/register',
    method:'post',
    data:userInfo
  })
}
//登录请求
//请求用户登录
// /api/user/passport/login
// post
export const reqUserLogin = (userInfo) => {
  return Ajax({
    url:'/user/passport/login',
    method:'post',
    data:userInfo
  })
}
//获取用户信息
export const reqUserInfo=() => {
  return Ajax({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}
//退出登录
export const reqLeaveLogin=() => {
  return Ajax({
    url:'/user/passport/logout',
    method:'get'
  })
}
//获取商品订单交易也信息
export const reqPurchaseOrder=() => {
  return Ajax({
    url:'/order/auth/trade',
    method:'get'
  })
}
//请求地址

export const reqAddressList = () => {
  return Ajax({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
  })
}
//提交创建订单
export const reqSubmitList=(tradeNo,tradeInfo) => {
  return Ajax({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeInfo
  })
}
//请求获取支付信息
export const reqPayMessage=(orderId) => {
  return Ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'

  })
}
//请求支付状态
export const reqPayStatus=(orderId) => {
  return Ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}
//请求获取我的订单数据
// /api/order/auth/{page}/{limit}
export const reqMyOrderInfo = (page,limit) => {
  return Ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}

