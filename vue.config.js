module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 起别名，这里需要注意，如果是在template模版中使用的时候前边需要加一个～波浪符才会被识别为别名
        // 在style标签里的url引用也是一样的，在script标签里可以只是使用，不需要波浪符号
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'utils': '@/utils',
        'views': '@/views'
      }
    }
  },
  publicPath: './'
}