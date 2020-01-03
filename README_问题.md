## 1. 2种定义组件方式的比较?
  1). 非单文件组件: Vue.component()
      可以直接运行
      编码麻烦: 模板编写没有提示/也不直观
  2). 单文件组件: xxx.vue
      模板编写有提示/也比较直观
      需要先编译好后才能运行
## 2. 区别webpack和webpack-cli?
  1). webpack: 打包/编译代码的
  2). webpack-cli: 提供启动打包程序的命令 webpack命令

## 3. webpack的几个基本配置项?
  0). mode
  1). entry
  2). output
  3). module & rules
  4). plugins
  5). devServer

## 4. 区别webpack的开发环境与生产环境?
  1). 开发环境运行: 
      webpack-dev-server --mode development
      1). 在内存中打包, 生成内存中的打包文件
      2). 启动服务器运行  ---可以通过浏览器访问

  2). 生产环境打包并运行
      wepack --mode poroduction
      1). 在内存中打包, 生成内存中的打包文件
      2). 将打包文件保存到本地(硬盘上)    ---还不可以通过浏览器访问
      serve dist
      1). 将本地打包文件加载到内存中
      2). 启动服务器运行   ---可以通过浏览器访问


## 5. 说几个webpack中常用的工具包?
  webpack-dev-server
  babel-loader
  css-loader
  style-loader
  file-loader
  url-loader
  html-webpack-plugin
  clean-webpack-plugin

## 6. 区别babel的plugin(插件)与preset(预设)?
  babel本身不能编译ES6的语法
  babel需要基于它的plugin来做ES语法的编译
  每个语法都一个对应的babel plugin包来编译对应的语法
  一个babel preset包是包含多个常用的babel plugin的集合包
  有什么好处: 便于下载配置