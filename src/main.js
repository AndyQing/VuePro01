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
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
//5.3 new Vuex.Store()实例，得到一个数据仓储对象
var store = new Vuex.Store({
  state: {
    // 如果想要访问store中的数据，只能通过 this.$store.state.*** 来访问
    count: 2,
    car: car,//购物车商品数据，咱们可以暂时将这个商品对象，设计成这个样子   
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
    },
    // 如果子组件想要调用mutations中的方法，只能使用 this.$store.commit('方法名')
    // 注意：mutations中的方法最多有两个参数


    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设 在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    //getters只负责对外提供数据，不负责修改数据，请用mutations中的方法修改数据
    optCount: function (state) {
      return '当前最新count值是:' + state.count
      //与过滤器相似，对数据进行了包装，然后提供给了调用者
    },

    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,//1.4 挂载路由
  store,//5.4 只要挂载到vm上，任何组建都能使用store来存取数据
})

