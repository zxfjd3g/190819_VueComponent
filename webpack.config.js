/* 
使用commonjs模块化语法
向外暴露一个配置对象
*/
const path = require('path') // node内置
// __dirname: 全局变量, 当前文件所在目录的绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/* 
返回指定目录的绝对路径
*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 模式
  // mode: 'development',

  // 入口
  entry: {
    app: './src/index.js'
  },

  // 出口
  output: {
    path: resolve('dist'), // dist的绝对路径   所有打包生成文件的基础路径
    filename: 'static/js/[name].bundle.js',
    publicPath: '/', // 生成的引用路径的左边都有一个/
    // publicPath: 'https://www.bootcdn.cn/', // 存放了打包资源的一个在线基础url
  },

  // 模块加载器
  module: {
    rules: [  // 内部配置loader
      // 处理vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'  // loader内部都有一个处理函数
      },

      // 处理ES6 ==> ES5
      {
        test: /\.js$/,  // 处理js文件
        // exclude: /(node_modules|bower_components)/, // 排除匹配的文件夹
        include: [resolve('src')], // 只对匹配的文件夹处理  ==> 加快打包
        // use: ['babel-loader'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 配置预设包(包含了多个ES语法解析的plugin包)
            plugins: [ // 配置预设包之外的插件包
              [
                "babel-plugin-component", 
                {
                  "libraryName": "mint-ui", // 针对mint-ui来实现按需引入打包
                  "style": true  // 自动打包组件对应的样式
                }
              ]
            ]
          }
        }
      },

      // 处理CSS
      {
        test: /\.css$/,
        // css-loader: 将css转移到js中
        // style-loader: 将js中css转移到html的<style>
        // vue-style-loader是对style-loader的增强
        use: ['vue-style-loader', 'css-loader']  // loader处理从下向上, 从右向左
      },

      // 处理图片
      {
        test: /\.png|jpe?g|gif|svg$/,
        // loader: 'file-loader', // 不会进行小图片的base64处理
        // url-loader内部会使用file-loader
        use: [
          {
            loader: 'url-loader', // 会进行小图片的base64处理
            options: {
              limit: 1 * 1024,  // 小于10k的图片就进行base64处理
              name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
            }
          }
        ]
      }
    ]
  },

  // 插件
  plugins: [ // 插件实例对象
    new HtmlWebpackPlugin({ // 自动引入打包文件
      template: 'index.html' // 在执行命令所在目录下查找
    }),
    new CleanWebpackPlugin(), // 清除打包文件夹dist
    new VueLoaderPlugin(), 
  ],

  // 开发服务器
  devServer: {
    port: 8081, // 端口号
    open: true, // 自动打开浏览器
    quiet: true, // 不做太多日志输出
    // 配置代理
    proxy: { // http:/localhost:8081/api/xxx
      // '/api': 'http://localhost:4000'     // http:/localhost:4000/api/xxx
      '/api': { // 匹配处理以/api开头的请求
        target: 'http://localhost:4000',  // 转发的目标地址
        pathRewrite: {'^/api' : ''}, // 在转发请求前去除路径中的/api   // http:/localhost:4000/xxx
        changeOrigin: true, // 支持协议名的跨域
      },
      '/3000': { // 匹配处理以/3000开头的请求
        target: 'http://localhost:3000',  // 转发的目标地址
        pathRewrite: {'^/3000' : ''}, // 在转发请求前去除路径中的/3000
        changeOrigin: true, // 支持协议名的跨域
      },
    },
    historyApiFallback: true, // 请求404时返回index页面
  },

  // 模块引入解析
  resolve: {
    /* 
    1. 简化模块路径的编写
    2. 加快打包速度
    */
    alias: { // 模块路径别名
      '@': resolve('src'),  
      '@comps': resolve('src/components'),  
      // 'vue$': 'vue/dist/vue.esm.js',  // 指定引入vue的哪个打包文件
    },
    extensions: ['.js', '.vue'], // 指定哪些后缀的模块可以省略后缀
  },

  // 开启source-map
  devtool: 'cheap-module-eval-source-map',
}

/* 
entry / output / module&rules / plugins
devSever / devtool / mode / resolve
*/