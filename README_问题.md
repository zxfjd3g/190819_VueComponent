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
  1). mode
  2). entry
  3). output
  4). module & rules
  5). plugins
  6). devServer

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

## 7. webpack的resolve配置能做什么?
    extends: 指定可以省略的模块文件后缀名
    alias: 引入模块的路径别名  ==> 简化编码 / 加快打包

## 8. 如何配置vue单文件组件开发的环境?
    下载包: vue / vue-loader / vue-template-compiler
    配置:
        vue-loader
        VueLoaderPlugin
        vue-style-loader

## 9. 自定义vue开发环境有没有遇到过什么问题?
    编码:
        components: {App},
        template: '<App/>'
    问题: 运行报错, 提示当前使用vue版本只是一个运行时版本, 不带模板编译器
    原因:
        template的编译需要使用vue的编译模板的代码
        它没有使用vue-template-compiler包
    解决:
        办法1: 配置指定使用vue带编译器的版本, resolve.alias                    vue-cli2
        办法2: 编码使用render  (内部使用vue-template-compiler包进行预编译模板)   vue-cli3
    哪种办法更好: 办法2
        打包文件更小


## 10. 组件化开发的基本流程和2个重要问题?
    拆分组件: 拆分界面, 定义组件
    静态组件: 使用组件搭建静态界面
    动态组件:
        初始化动态显示
        交互: 与用户/后台
    2个重要问题?
        数据定义在哪个组件?  哪个组件需要还是哪些组件
        更新数据的方法定义在哪个组件? 数据在哪个组件方法就定义在哪个组件
    设计数据的3个问题?
        类型
        名称 
        在哪个组件

## 11. 模板中需要显示的数据来源有哪3个?
    data: 自身可变数据
    props: 外部(父组件)传入的数据
    computed: 根据已有data/props/其它的computed进行计算产生的可变数据

## 12. 列出 vue 常用的配置选项?
    el
    data
    props
    computed
    watch
    methods
    filters
    directives
    components

## 组件间的关系
    父子: 父 ==> 子  / 子 ==> 父
    祖孙: 祖 ==> 孙  /  孙 ==> 祖 
    兄弟
    其它

## 事件处理的理解
    1). 绑定事件监听
        事件名
        回调函数: function (event) {}
    2). 分发事件 (distpatch/emit event)
        事件名
        数据: event对象
