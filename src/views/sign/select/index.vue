<!--
Template Name: sign
Create author: qinglong
Create Time  : 2020-10-06
-->
<template>
  <div class="contract">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="imglist" v-if="title=='套餐选择'">
      <template v-for="(item,index) in list">
        <div class="imgitem" :key="index" @click.stop="to(item)">
          <div class="left">
            <van-image fit="cover" :src="item.meal_pic" :key="index"> </van-image>
          </div>
          <div class="right">{{item.label}}</div>
        </div>
      </template>
    </div>

  </div>
</template>
<script>
export default {
  name: "sign",
  data() {
    return {
      list: [],
      title: "套餐选择",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/client/Meal/list");
      if (data.code) {
        this.list = data.data;
      } else {
        this.$router.replace("./see");
      }
    },
    to(item) {
      this.$router.push("./see?id=" + item.id);
    },
  },
};
</script>
<style lang='less' scoped>
.contract {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  .imglist {
    padding: 20px;
    .imgitem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 10px;
      border-radius: 5px;
      .left {
        width: 150px;
        height: 88.3px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        overflow: hidden;
      }
      .right {
        flex: 1;
        text-align: center;
      }
      &:hover {
        box-shadow: 0 0 10px #f60;
        cursor: pointer;
        color: #f60;
      }
    }
  }
}
</style>