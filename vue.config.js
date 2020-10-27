module.exports = {
  devServer: {
    open: true
  },
  publicPath: '././',
  assetsDir:"static",
  devServer: {
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: process.env.NODE_ENV == 'production'?'':'http://192.168.22.22:8090/api/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ''
        }
      }
    }
  }
}