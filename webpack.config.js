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
    filename: 'static/js/[name].bundle.js'
  },

  // 模块加载器
  module: {
    rules: [  // 内部配置loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // 处理ES6 ==> ES5
      {
        test: /\.js$/,  // 处理js文件
        // exclude: /(node_modules|bower_components)/, // 排除匹配的文件夹
        include: [resolve('src')], // 只对匹配的文件夹处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 配置预设包(包含了多个ES语法解析的plugin包)
            plugins: [ // 配置预设包之外的插件包

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
      // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
    },
    extensions: ['.js', '.vue'], // 指定哪些后缀的模块可以省略后缀
  },

  // 开启source-map
  devtool: 'cheap-module-eval-source-map',
}

/* 
理解babel的plugin(插件)与preset(预设)
    babel本身不能编译ES6的语法
    babel需要基于它的plugin来做ES语法的编译
    每个语法都一个对应的babel plugin包来编译对应的语法
    一个babel preset包是包含多个常用的babel plugin的集合包
    有什么好处: 便于管理配置
*/