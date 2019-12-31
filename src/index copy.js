import './test.css'
import logo from './logo.png'

console.log('Hello Webpack444444!')
document.getElementById('root').innerHTML = '<h1>Hello4444</h1>'


const fn = () => {
  console.log('fn()..')
}

const image = new Image()
image.src = logo
document.getElementById('root').appendChild(image)