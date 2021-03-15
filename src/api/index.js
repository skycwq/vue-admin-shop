import Ajax from './ajax'
// 请求三级列表数据
export const reqCategoryList=() => {
  return  Ajax({
        url:'/product/getBaseCategoryList',
        methods:'get'
    })
}