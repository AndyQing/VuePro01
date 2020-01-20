<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :lunbotu="lunbotu" :imgname="'img'" :isfull="true"></swiper>

    <!-- 九宫格布局 -->
    <!-- 不知道为啥，图片没展示 -->
    <!-- <img src='../../images/menu1.png'> -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newslist">
              <!-- <img src="../../images/menu1.png" alt=""> -->
               <img :src="menu1" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/photolist">
              <img :src="menu2" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/goodslist">
              <img :src="menu3" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
              <img :src="menu4" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
              <img :src="menu5" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
              <img :src="menu6" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul>

  </div>
</template>

<script>
// 导入自己封装的轮播图子组件
import swiper from "../sub-components/Swiper.vue";

import menu1 from "../../images/menu1.png"
import menu2 from "../../images/menu2.png"
import menu3 from "../../images/menu3.png"
import menu4 from "../../images/menu4.png"
import menu5 from "../../images/menu5.png"
import menu6 from "../../images/menu6.png"

export default {
  data() {
    return {
      menu1:menu1,
            menu2:menu2,
            menu3:menu3,
            menu4:menu4,
            menu5:menu5,
            menu6:menu6,
      lunbotu: [
        {img:'https://wap.jiaogelangzhong.com/upload/soreImage/15731822586949455.png'},
        {img:'https://wap.jiaogelangzhong.com/upload/soreImage/15343196999701030.png'}
        ] // 轮播图的数组
    };
  },
  created() {
    this.getlunbotu();
  },
  methods: {
    async getlunbotu() {
      // 获取轮播图的方法--此时接口没有数据，所以我来写死数据
      // const { data } = await this.$http.get("http://vue.studyit.io/api/getlunbo");
      // if (data.status === 0) this.lunbotu = data.message;
    }
  },
  components: {
    // 注册子组件
    swiper
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view {
  li {
    img {
      width: 60px;
      height: 60px;
    }
    div {
      font-size: 12px;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>
