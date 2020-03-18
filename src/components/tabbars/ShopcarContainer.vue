<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-item">
            <!-- 开关 -->
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <!-- <mt-switch></mt-switch> -->
            <!-- 图片 -->
            <img :src="item.thumb_path" alt />
            <!-- 信息区域 -->
            <div class="info">
              <h1>{{ item.title }}</h1>
              <div class="goods-info">
                <span class="price">￥{{ item.price }}</span>
                <!-- initcount表示这条商品对应的数量 -->
                <nobox :initcount="$store.getters.getGoodsCount[item.id]" :id="item.id"></nobox>
                <!-- <nobox></nobox> -->
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="danger">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价
                <span class="danger">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
import nobox from "../sub-components/shopcar_nobox.vue";

export default {
  data() {
    return {
      goodslist: [
        {
          id: 13,
          title: "加购商品1",
          price: 12,
          thumb_path:
            "https://wap.jiaogelangzhong.com/upload/soreImage/15731822586949455.png"
        }
      ] // 商品列表
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表
      // this.$http
      //   .get("api/goods/getshopcarlist/" + idArr.join(","))
      //   .then(result => {
      //     if (result.body.status === 0) {
      //       this.goodslist = result.body.message;
      //     }
      //   });

      this.goodslist = JSON.parse(localStorage.getItem("car") || "[]"); //因为之前本地存储的数据没有保存图片，所以这块先不显示
    },
    del(id) {
      // 删除商品
      // console.log(id);
      // 从界面上删除数据
      this.goodslist.some((item, i) => {
        if (item.id == id) {
          this.goodslist.splice(i, 1);
          return true;
        }
      });
      // 从 vuex 中删除数据
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的 快关状态，同步到 store 中
      // console.log(id + " --- " + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    nobox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-item {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}

.danger {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
