<template>
  <div>

		<!-- 图片分类区域 -->
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
            <!-- 为了修改手机端不能切换的问题，@click改成@tap，@tap也只能在mui中用到 -->
						<span 
							:class="['mui-control-item', item.id === 0 ? 'mui-active' : '' ]" 
							v-for="item in category" 
							:key="item.id"
							@tap="getPhotoByCategory(item.id)">
							{{ item.title }}
						</span>
					</div>
				</div>

			</div>

    
		<!-- 图片的列表区域 -->
		<ul class="lazyul">
			<router-link tag="li" v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/' + item.id">
				<!-- 注意： v-lazy 要指定图片的地址 -->
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-content">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>

  </div>
</template>

<script>
// 导入 mui 的JS文件， 这样，就可以使用 mui 来初始化 滑动控件了
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      category: [{id:0,title:'全部'},{id:1,title:'推荐'},{id:2,title:'热点'},{id:3,title:'北京'},
      {id:4,title:'社会'},{id:5,title:'娱乐'},{id:7,title:'民生'}], // 所有的图片分类数据
      photolist: [
        {
          id:1,
          title:'1111',
          img_url:'http://p3.pstatp.com/large/1af20005faf74a46dc10',
          zhaiyao:'摘要1111摘要1111摘要1111摘要1111摘要1111摘要1111'
        },
        {
          id:2,
          title:'222',
          img_url:'http://p3.pstatp.com/large/1af50006289d5daeba38',
          zhaiyao:'摘要1111'
        },
        {
           id:3,
          title:'333',
          img_url:'http://p1.pstatp.com/large/1af20005fbcb3471d9df',
          zhaiyao:'摘要1111'
        },
      ] // 图片列表
    };
  },
  created() {
    this.getPhotoCategory();
    this.getPhotoByCategory(0);
  },
  methods: {
    async getPhotoCategory() {
      // 获取图片的分类数据
      // const { data } = await this.$http.get("/api/getimgcategory");
      // if (data.status === 0) {
      //   // 手动补全分类的信息
      //   data.message.unshift({ title: "全部", id: 0 });
      //   this.category = data.message;
      // }
    },
    async getPhotoByCategory(id) {
      // console.log("123");
      // 根据图片分类的Id获取图片的数据
      // const { data } = await this.$http.get("/api/getimages/" + id);
      // if (data.status === 0) return (this.photolist = data.message);
    }
  },
  mounted() {
    // 当此钩子函数执行的时候，我们才可以进行控件或插件的初始化工作；
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
.mui-slider {
  touch-action: pan-x;//为了去除头部横向滑动时的警告
}

.lazyul {
  margin: 0;
  padding: 10px;

  li {
    background-color: #ccc;
    text-align: center;
    box-shadow: 0 0 7px gray;
    position: relative;
    & + li {
      // 这种样式的写法，适合场景： 排除第一个，应用给其它所有的li
      margin-top: 10px;
    }
    img {
      vertical-align: middle;//解决图片下有3像素的问题
      width: 100%;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}

.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 86px;
  overflow: hidden;
  text-align: left;
  padding: 0 5px;
  .info-title {
    font-size: 14px;
  }
  .info-content {
    font-size: 13px;
  }
}
</style>
