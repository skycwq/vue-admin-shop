import Ajax from './ajax'
import mockAjax from './mockAjax'
// 请求三级列表数据
export const reqCategoryList=() => {
  return  Ajax({
        url:'/product/getBaseCategoryList',
        methods:'get'
    })
}
//请求listcatagory轮播页面
export const reqBannerList=() => {
  return mockAjax({
    url:'/banners',
    methods:'get'
  })
}
//请求floor页面数据
export const reqFloorList=() => {
  return mockAjax({
    url:'/floors',
    methods:'get'
  })
}