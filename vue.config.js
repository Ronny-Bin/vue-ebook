const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 32   //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ?'./'
      :'/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      },
      less: { // 配置less（其他样式解析用法一致）
        //javascriptEnabled: true // 设置为true
      }
    }
  },
  devServer: {
    //baseUrl: '/',
    /*proxy: {
      // 配置跨域
      '/api': {
        target: 'http://47.99.166.157/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },*/

  }
}
