module.exports = {
  lintOnSave: false, //彻底关闭eslint的语法检查，一般我们都是在开发阶段全部关闭的

  devServer:{
    // 配置代理
    proxy: {
      // 在没配代理的情况下  404
      // http://localhost:8080/api/product/getBaseCategoryList
      // 我们的目标是想往http://39.98.123.211/api/product/getBaseCategoryList 发
      //陪完代理之后，就会改变服务器地址，但是路径不变
      // http://39.98.123.211/api/product/getBaseCategoryList
      "/api": {
        target: "http://39.98.123.211", //转发到目标服务器
        // target: "http://localhost:3000", //转发到目标服务器
        // pathRewrite: {"^/api" : ""}  //重写路径，是去掉路径中的/api，看情况写还是不写
      }
    }
  }
}