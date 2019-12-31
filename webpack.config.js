/* 
使用commonjs模块化语法
向外暴露一个配置对象
*/
const path = require('path') // node内置
// __dirname: 全局变量, 当前文件所在目录的绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 模式
  // mode: 'development',

  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'), // dist的绝对路径
    filename: '[name].bundle.js'
  },
  // 模块加载器
  module: {
    rules: [  // 内部配置loader

    ]
  },
  // 插件
  plugins: [ // 插件实例对象
    new HtmlWebpackPlugin({
      template: 'index.html' // 在执行命令所在目录下查找
    }),
    new CleanWebpackPlugin() // 清除打包文件夹dist
  ],

  // 开发服务器
  devServer: {
    port: 8081, // 端口号
    open: true, // 自动打开浏览器
    quiet: true, // 不做太多日志输出
  },
}
