/* 
包含n个用于间接更新状态数据的方法的对象
*/
import axios from 'axios'
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {
  /* 
  搜索的异步action: 包含异步ajax请求的代码
  */
  async search ({commit}, searchName) {
    // 更新状态数据(请求中)
    commit(REQUESTING)
    // 发异步ajax请求, 获取users数据
    try {
      // 发搜索的ajax请求
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: searchName
        }
      })
       // 请求成功了, 更新状态数据(成功)
      const result = response.data
      const users = result.items.map(item =>({
        username: item.login,
        url: item.html_url,
        avatar_url: item.avatar_url
      }))
      // commit(REQ_SUCCESS, users) // 直接指定数据
      commit(REQ_SUCCESS, {users}) // 指定包含数据的对象
    } catch (error) { // 请求失败, 更新数据(失败)
      // commit(REQ_ERROR, '请求出错: ' + error.message)
      commit(REQ_ERROR, {msg: '请求出错: ' + error.message})
    }
  }
}