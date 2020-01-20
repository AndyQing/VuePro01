//main.js是我们项目的JS入口文件
// console.log("hello");
import Vue from 'vue'
import { Header } from 'mint-ui'
import app from './App.vue'
import './lib/mui/css/mui.css'
import "./lib/mui/css/icons-extra.css"

Vue.component(Header.name, Header);
var vm = new Vue({
  el: '#app',
  render: c => c(app)
})

