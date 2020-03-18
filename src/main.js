//main.js是我们项目的JS入口文件
// console.log("hello");
import Vue from 'vue'
import app from './App.vue'
// import app from './components/vuexdemo/App.vue'//练习vuex
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

//配置vuex：
//5.1安装，后导入
import Vuex from 'vuex'
//5.2注册vuex到Vue中
Vue.use(Vuex)
//5.3 new Vuex.Store()实例，得到一个数据仓储对象
var store = new Vuex.Store({
  state: {
    // 如果想要访问store中的数据，只能通过 this.$store.state.*** 来访问
    count: 2,
    car: [],//购物车商品数据，咱们可以暂时将这个商品对象，设计成这个样子   
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: {
    //注意：如果要操作store中的state值，只能通过调用mutations 提供的方法，才能操作对应的数据
    //不推荐直接操作 state 中的数据，例如'this.$store.state.count++',因为万一导致了数据紊乱，不能快速定位到错误来源
    increment(state) {
      state.count++
    },
    increment2(state, num) {
      state.count += num
    }
    // 如果子组件想要调用mutations中的方法，只能使用 this.$store.commit('方法名')
    // 注意：mutations中的方法最多有两个参数
  },
  getters: {
    //getters只负责对外提供数据，不负责修改数据，请用mutations中的方法修改数据
    optCount: function (state) {
      return '当前最新count值是:' + state.count
      //与过滤器相似，对数据进行了包装，然后提供给了调用者
    }
  }
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,//1.4 挂载路由
  store,//5.4 只要挂载到vm上，任何组建都能使用store来存取数据
})

