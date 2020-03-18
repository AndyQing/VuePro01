<template>
  <div>
    <button @click="add">增加1</button>
    <button @click="add2">增加2</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    add() {
      // this.$store.state.count++; //不推荐直接操作 state 中的数据
      this.$store.commit("increment");
    },
    add2() {
      // this.$store.state.count++; //不推荐直接操作 state 中的数据
      this.$store.commit("increment2", 2);
    }
  }
};
</script>