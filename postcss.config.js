module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 7']
    // },
    'postcss-pxtorem': {
      rootValue: 75, // (Number | Function) 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'], // (Array) 'font', 'font-size', 'line-height', 'letter-spacing'
      unitPrecision: 5, // (Number) 单位转换后保留的精度
      selectorBlackList: [], // (Array) 要忽略的选择器，保留为px
      replace: true, // (Boolean)替换包含rems的规则，而不添加后备
      mediaQuery: false, // (Boolean)允许在媒体查询中转换px。
      minPixelValue: 0, // (Number)设置要替换的最小像素值。
      exclude: /node_modules/i // (String, Regexp, Function) 要忽略并保留为px的文件路径。
    }
    // 'postcss-px-to-viewport': {
    //   unitToConvert: 'px', // (String) 需要转换的单位，默认为"px"
    //   viewportWidth: 320, //  (Number) 设计稿的视口宽度
    //   unitPrecision: 5, // (Number) 单位转换后保留的精度
    //   propList: ['*'], // (Array) 能转化为vw的属性列表
    //   viewportUnit: 'vw', // (String) 希望使用的视口单位
    //   fontViewportUnit: 'vw', // (String) 字体使用的视口单位
    //   selectorBlackList: [], // (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
    //   minPixelValue: 1, // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
    //   mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
    //   replace: true, // (Boolean) 是否直接更换属性值，而不添加备用属性
    //   exclude: [], //  (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    //   include: [], // (Array or Regexp) 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
    //   landscape: false, // (Boolean) 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
    //   landscapeUnit: 'vw', // (String) 横屏时使用的单位
    //   landscapeWidth: 568 // (Number) 横屏时使用的视口宽度s
    // }
  }
}
