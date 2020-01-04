/* 
localStorage数据存取的工具模块: 包含n个工具函数
*/
// export default {
//   saveTodos () {},
//   getTodos () {}
// }


export function saveTodos(todos) {
  localStorage.setItem('todos_key', JSON.stringify(todos))
}

export const getTodos = () =>JSON.parse(localStorage.getItem('todos_key') || '[]')