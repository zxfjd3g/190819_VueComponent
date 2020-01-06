/* 
包含n个可变状态数据属性的对象
*/
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  // [REQ_ERROR] (state, msg) {
  [REQ_ERROR] (state, {msg}) {
    state.loading = false
    state.errorMsg = msg
  },

  // [REQ_SUCCESS] (state, users) {
  [REQ_SUCCESS] (state, {users}) {
    state.loading = false
    state.users = users
  },


}