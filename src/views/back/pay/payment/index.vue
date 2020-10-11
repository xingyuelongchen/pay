<!--
Template Name: payment
Create author: qinglong
Create Time  : 2020-09-15
-->
<template>
  <div class="container">
    <div class="head">
      <div class="nav">
        <div class="logo">
          <img src="http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg" alt="">
        </div>
        <div class="text">广艺舟 - 收银台</div>
      </div>
    </div>
    <div class="title">
      <span>订单提交成功，请尽快付款！订单号：{{ order_on}}
      </span>
      <span>应付金额 <i class="price"> {{price}}</i> 元</span>
    </div>
    <div class="body">
      <div class="top">
        微信支付
        <span v-if="time>0">距离二维码过期还剩
          <i>{{time}}</i> 秒，过期后请刷新页面重新获取二维码。</span>
        <span v-else style="color:#e33">二维码已过期，刷新页面重新获取二维码</span>
      </div>
      <div class="box">
        <div class="qr">
          <div class="img">
            <img v-if="time>0" src="~@/assets/image/qr.jpg" alt="">
          </div>
          <div class="info">
            <div>请使用微信扫一扫</div>
            <div>扫描二维码支付</div>
          </div>
        </div>
        <div class="iphone">
          <img src="~@/assets/image/pc_icon_phone-bg.png" alt="">
        </div>
      </div>
    </div>
    <div class="foot"> Copyright © 广艺舟 版权所有</div>
  </div>
</template>
<script>
export default {
  name: "Payment",
  data() {
    return { time: 0, timer: null, price: null, order_on: null };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let { totalprice, order_no, qrcode } = this.$route.query;
      this.order_on = order_no;
      this.price = totalprice || 0;
      this.src = qrcode;
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time == 0) clearInterval(this.timer);
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang='less' scoped>
.container {
  width: 960px;
  margin: 0 auto;
  .nav {
    height: 60px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 180px;
      height: 50px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .text {
      font-size: 22px;
      font-weight: bold;
      margin: 0 20px;
    }
  }
  .title {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 20px auto;
    .price {
      color: #e33;
      vertical-align: bottom;
      font-style: normal;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .body {
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    .top {
      font-size: 18px;
      span {
        font-size: 14px;
        padding-left: 80px;
        i {
          color: #e33;
          font-style: normal;
        }
      }
    }
    .box {
      display: flex;
      justify-content: center;
      margin: 40px auto;
      .info {
        text-align: center;
        background: #ff7674;
        height: 40px;
        width: 300px;
        padding: 10px 0;
        margin: 10px auto;
        color: #fff;
      }
      .qr {
        width: 300px;
        height: 380px;
        .img {
          width: 100%;
          height: 300px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .iphone {
        width: 300px;
        height: 380px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .foot {
    border-top: 1px solid #ccc;
    margin: 40px auto;
    padding: 20px 0;
    font-size: 12px;
    text-align: center;
    color: #666;
  }
}
</style>