module.exports = {
  devServer: {
    proxy: {
      // 匹配所有以 '/' 开头的请求
      '/': {
        target: 'http://localhost:8088', // 后端接口地址
        changeOrigin: true, // 开启代理，模拟同源请求
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
