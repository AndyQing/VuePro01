//main.js是我们项目的JS入口文件
// console.log("hello");
import Vue from 'vue'
import app from './App.vue'
import './lib/mui/css/mui.css'
import "./lib/mui/css/icons-extra.css"

//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 配置路由，安装路由模块
Vue.use(VueRouter)
//1.3 导入自己的router.ja路由模块
import router from './router.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://wap.jiaogelangzhong.com/JglzServer';
//全局设置post请求时候 表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

//按需导入mint-ui中的组件
// import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全局配置MintUI组件库
import MintUI from 'mint-ui'
// 导入 Mint-UI的样式表
import 'mint-ui/lib/style.css'
// 使用 Vue.use 来批量注册 MintUI 的组件
Vue.use(MintUI)

//导入图片预览插件
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router//1.4 挂载路由
})

