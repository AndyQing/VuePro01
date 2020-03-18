<template>
  <div>
    <add></add>
    <!-- <p>当前最新count值是:{{this.$store.state.count}}</p> -->
    <p>{{this.$store.getters.optCount}}</p>
  </div>
</template>
<script>
import add from "./add.vue";
export default {
  components: {
    // 注册子组件
    add
  }
};
</script>