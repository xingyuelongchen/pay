<!--
Template Name: sign
Create author: qinglong
Create Time  : 2020-10-06
-->
<template>
  <div class="contract">
    <van-sticky>
      <van-nav-bar title="合同签署" left-text="返回" left-arrow @click-left="$router.back()" />
    </van-sticky>
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field v-model="formData.name" name="姓名" label="姓名" placeholder="真实姓名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
        <van-field v-model="formData.mobile" type="tel" name="电话号码" label="电话号码" placeholder="电话号码" :rules="[{ required: true, message: '请填写电话号码' }]" />
        <van-field v-model="formData.idcard" name="身份证号" label="身份证号" placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <van-field v-model="formData.email" name="邮箱地址" label="邮箱地址" placeholder="邮箱地址" :rules="[{ required: true, message: '请填写邮箱地址' }]" />
        <van-field v-model="formData.taobao" v-if="form_id == 1" name="淘宝账号" label="淘宝账号" placeholder="淘宝账号" :rules="[{ required: true, message: '请填写淘宝账号' }]" />
        <van-field label="手写签名">
          <signCanvas slot="input" width="230" height="150" v-model="formData.sign" />
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交合同
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import signCanvas from "@/components/mixSignCanvas.vue";
export default {
  name: "sign",
  components: {
    signCanvas,
  },
  data() {
    return {
      list: [],
      show: true,
      id: "",
      width: "0px",
      height: "0px",
      index: 0,
      form_id: 1,
      formData: { mobile: "" },
    };
  },
  async created() {
    this.id = this.$route.query.id;
    let userinfo = this.getstore("userinfo");
    this.formData.uid = userinfo.id;
    this.formData.mobile = userinfo.mobile;
    this.formData.meal_id = this.id;
    if (this.id) this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/client/Meal/list");
      if (data.code) {
        let arr = data.data.filter((e) => e.id == this.id)[0];
        this.list = arr.pic;
        this.form_id = arr.form_id;
      }
    },
    async onSubmit() {
      let { data } = await this.axios("/client/meal/autograph", {
        data: this.formData,
      });
      if (data.code) {
        this.$toast.success(data.msg);
      } else {
        this.$toast.fail(data.msg);
      }
    },
    init() {
      // 初始化canvas
      let width = this.$refs.box.scrollWidth;
      let height = this.$refs.box.scrollHeight;
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
    margin: 0 auto;
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
    height: 80px;
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