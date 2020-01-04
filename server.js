/* 
使用express搭建一个后台服务器
*/
const axios = require('axios')
const express = require('express')

const app = express()

// 注册后台路由(转发请求)
app.get('/repositories/:q', (req, res) => {
  const q = req.params.q

  setTimeout(() => {
    res.send({
      status: 0,
      data: {name: 'vue', html_url: 'http://www.github.com/vue'}
    })
  }, 1000);
  /* axios({
    method: 'GET',
    url: 'https://api.github.com/search/repositories',
    params: {
      q,
      sort: 'stars'
    }
  }).then(response => {
    const {name, html_url} = response.data.items[0]
    res.send({
      status: 0,
      data: {name, html_url}
    })
  }) */

})

app.listen('4000', () => {
  console.log('server started: http://localhost:4000')
})