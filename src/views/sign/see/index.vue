<!--
Template Name: see
Create author: qinglong
Create Time  : 2020-10-06
-->
<template>
  <div class="contract">
    <van-sticky>
      <van-nav-bar title="合同预览" left-text="返回" left-arrow @click-left="$router.back()" />
    </van-sticky>
    <div class="imgbox" ref="box" @click.stop="preview">
      <canvas ref='canvas' class="imgitem">当前浏览器不支持在线签合同</canvas>
    </div>
    <div class="bottom">
      <div class="btn">
        <van-button type="info" v-if="index>0" @click="prev">上一页</van-button>
        <van-button type="danger" v-if="!id" @click="$router.back()">返回</van-button>
        <van-button type="danger" v-if="index == list.length-1 && id" @click="save">去签署</van-button>
        <van-button type="primary" v-if="index<list.length-1" @click="next">下一页</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";

export default {
  name: "see",
  data() {
    return {
      list: [],
      id: "",
      width: "0px",
      height: "0px",
      index: 0,
      formData: {},
    };
  },
  async created() {
    this.id = this.$route.query.id;
  },
  async mounted() {
    if (this.id) {
      await this.getData();
    } else {
      await this.getViews();
    }
    this.init();
  },
  methods: {
    async getViews() {
      let userinfo = this.getstore("userinfo");
      let { data } = await this.axios("/client/Meal/see_contract", {
        data: { uid: userinfo.id },
      });
      if (data.code) {
        this.list = data.data;
      }
    },
    async getData() {
      let { data } = await this.axios("/client/Meal/list");
      if (data.code) {
        this.list = data.data.filter((e) => e.id == this.id)[0].pic;
      }
    },
    init() {
      let width = this.$refs.box.clientWidth;
      let height = this.$refs.box.clientHeight;
      let canvas = this.$refs["canvas"];
      this.width = canvas.width = width;
      this.height = canvas.height = height;
      this.ctx = canvas.getContext("2d");
      this.viewsImg();
    },
    viewsImg() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      let img = new Image();
      let index = this.index;
      img.src = this.list[index];
      img.onload = () => {
        this.ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          this.width,
          this.height
        );
      };
    },
    prev() {
      this.index -= 1;
      this.viewsImg();
    },
    next() {
      this.index += 1;
      this.viewsImg();
    },
    preview() {
      ImagePreview({
        images: this.list,
        startPosition: this.index,
        closeable: true,
      });
    },
    save() {
      this.$router.replace("./sign?id=" + this.id);
    },
  },
};
</script>
<style lang='less' scoped>
.contract {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  .imgbox {
    width: 90%;
    margin: 10px auto;
    padding-bottom: 141%;
    height: 0;
    overflow: hidden;
    position: relative;
    border: 1px solid #ccc;
    .imgitem {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-evenly;
    height: 100px;
    .btn {
      background: #fff;
      border-top: 1px solid #eee;
      position: fixed;
      bottom: 0;
      height: 60px;
      width: 100%;
      max-width: 750px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .van-button {
        flex: 1;
      }
    }
  }
}
</style>