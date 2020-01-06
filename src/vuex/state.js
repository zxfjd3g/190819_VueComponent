/* 
包含n个可变状态数据属性的对象
*/
export default {
  firstView: true, // 是否显示第一个界面
  loading: false, // 是否正在请求中
  users: [], // 用户列表
  errorMsg: '', // 请求错误的提示信息
}