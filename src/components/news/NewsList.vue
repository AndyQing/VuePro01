<template>
  <div>
    <!-- <p>新闻列表页</p> -->
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                <!-- <span>发表时间：{{ item.add_time | dateFormat }}</span> -->
                <span>发表时间：{{ item.add_time | dateFormat('YYYY-MM-DD HH:mm') }}</span>
                <span>点击：{{ item.click }}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>

  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    // MVVM
    return {
      // newslist: [] // 默认在页面中挂载一个空数组，表示 新闻列表
        newslist: [{
          id:1,
          add_time:'2020-09-30',
          click:60,
          title:'1111',
          img_url:'http://p9.pstatp.com/list/190x124/1bb7000cac6d5d4e579e',
        },
        {
          id:2,
          add_time:'2020-10-30',
          click:70,
           title:'22222',
           img_url:'http://p9.pstatp.com/list/190x124/1bb7000cac6d5d4e579e',
        },
         {
          id:3,
          add_time:'2020-10-30',
          click:70,
           title:'3333',
           img_url:'http://p9.pstatp.com/list/190x124/1bb7000cac6d5d4e579e',
        },
         {
          id:4,
          add_time:'2020-10-30',
          click:70,
           title:'444',
           img_url:'http://p9.pstatp.com/list/190x124/1bb7000cac6d5d4e579e',
        },
        ]
    };
  },
  created() {
    // 每当页面加载的时候，就获取数据
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      // 获取新闻列表
      // const { data } = await this.$http.get("api/getnewslist");
      // // 如果获取数据成功，则把数据挂载到 data上
      // if (data.status === 0) return (this.newslist = data.message);

      // this.$http.get("api/getnewslist").then(result=>{
      //   if(result.body.status===0){

      //   }else{
      //     Toast("获取失败");
      //   }
      // });

    }
  }
};
</script>

<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
  }
  .mui-ellipsis {
    color: #26a2ff;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
