const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  publicPath: '/',
  transpileDependencies: [],
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // 设置目录别名
    config.resolve.alias
      .set('@', resolve('src'))

    // 设置cdn，暂时不用
    // var externals = {
    //   vue: 'Vue',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex'
    // }
    // config.externals(externals)
    const cdn = {
      css: [
        // element-ui css
        '//unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      js: [
        // vue
        '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
        // vue-router
        '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
        // vuex
        '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
        // axios
        '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        // element-ui js
        '//unpkg.com/element-ui/lib/index.js'
      ]
    }
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })

    // 代码切割
    // config.optimization.runtimeChunk({
    //   name: 'manifest'
    // })
    config.optimization.splitChunks({
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })

    // gzip
    // if (process.env.NODE_ENV === 'production') {
    //   // #region 启用GZip压缩
    //   config
    //     .plugin('compression')
    //     .use(CompressionPlugin, {
    //       asset: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       cache: true
    //     })
    //     .tap(args => { })
    //   // #endregion
    // }
    if (process.env.NODE_ENV === 'production') {
      // config
      //   .plugin('webpack-bundle-analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
  },
  devServer: {
    // open: true,
    // host: '0.0.0.0',//如果是真机测试，就使用这个IP
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // proxy: null, // 设置代理
    // // proxy: {
    // //     '/api': {
    // //         target: '<url>',
    // //         ws: true,
    // //         changOrigin: true
    // //     }
    // // },
    // before: app => {}
  }
}
