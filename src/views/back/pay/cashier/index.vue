<!--
Template Name: Cashier pc
Create author: qinglong
Create Time  : 2020-09-15
-->
<template>
  <div class="container">
    <div class="head">
      <div class="nav"> </div>
    </div>
    <div :class="['body']">
      <div class="nav">
        <div class="logo">
          <img src="http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg" alt="">
        </div>
        <div class="text">广艺舟 - 收银台</div>
      </div>
      <div class="patment">
        <div class="title">支付方式：</div>
        <div class="list">
          <template v-for="(item,index) in payment">
            <div class="item" :key="index" :class="{active:item.type == payType}" @click="setPayment(index)">
              <div class="icon iconfont" v-html="item.icon"></div>
              <div class="test">{{item.text}}</div>
              <div class="checkbox">
                <span class="iconfont" v-if="item.type == payType">&#xe6c8;</span>
                <span class="iconfont" v-else>&#xe6c9;</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="title">购买列表：</div>
      <div class="body-content">
        <template v-for="(item,index) in orderList">
          <div class="item" :key="index">
            <div class="pic">
              <img :src="item.pic" alt="">
            </div>
            <div class="text">{{item.title}}</div>
            <div class="price">￥{{item.price}}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="foot">
      <div :class="['item']">
        <div>
          <div>共选择 1 件商品</div>
          <div>
            总价：
            <span class="price">￥{{totalprice }} </span>
          </div>
        </div>
        <div class="btn" @click.stop="submit">提交订单</div>
      </div>
    </div>
    <div class="dialog" v-if="submitShow">
      <div class="box">
        <div class="title">确认支付结果</div>
        <div class="btn">
          <div @click.stop="fail">遇到问题</div>
          <div @click.stop="success">成功支付</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cashier",
  data() {
    return {
      submitShow: false,
      payType: "alipay",
      totalprice: 0,
      order_no: null,
      payment: [
        { icon: "&#xe62e;", type: "alipay", text: "支付宝" },
        { icon: "&#xe60e;", type: "wechat", text: "微信" },
        // { icon: "&#xed41;", type: "3", isActive: false }
      ],
      orderList: [
        {
          pic: "http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg",
          text: "描述信息",
          price: "200.20",
        },
        {
          pic: "http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg",
          text: "描述信息",
          price: "200.20",
        },
        {
          pic: "http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg",
          text: "描述信息",
          price: "200.20",
        },
        {
          pic: "http://www.guangyizhou.cn/public/home1/assets/img/logo2.svg",
          text: "描述信息",
          price: "200.20",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let userinfo = window.localStorage.getItem("userinfo") || false;
      if (userinfo) {
        userinfo = JSON.parse(userinfo);
        let { data } = await this.axios("/client/Order/info_order", {
          data: userinfo,
        });
        if (data.code) {
          this.orderList = [data.data];
          let num = "";
          this.orderList.map((e) => (num += e.price));
          this.totalprice = num;
          this.order_no = data.data.order_no;
        }
      }
    },
    setPayment(index) {
      this.payment = this.payment.map((e, i) => {
        e.isActive = false;
        if (i == index) {
          e.isActive = true;
          this.payType = e.type;
        }
        return e;
      });
    },
    async submit() {
      if (this.isUA !== "web") {
        this.$alert("请使用电脑打开本支付页面", "警告！", {
          type: "error",
        });
        return;
      }
      let { data } = await this.axios("/client/Order/payment", {
        data: { type: this.payType, payment: this.isUA },
      });
      if (data.code) {
        if (this.payType == "wechat") {
          let routeData = this.$router.resolve({
            path: "payment",
            query: {
              qrcode: "", // 二维码地址,
              totalprice: this.totalprice,
              order_no: this.order_no,
            },
          });
          window.open(routeData.href, "_blank");
        }
        if (this.payType == "alipay") {
          window.open(data.data, "_blank");
        }
        this.submitShow = true;
      }
    },
    async success() {
      // 支付成功
      console.log("调用支付成功接口");
      this.submitShow = false;
    },
    async fail() {
      // 支付失败
      console.log("调用支付失败接口");
      this.submitShow = false;
    },
  },
};
</script>
<style lang='less' scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f9f9f9;
  .head {
    height: 200px;
    background: rgba(0, 0, 0, 0.1);
    background: url(~@/assets/image/bg.jpg) center center;
  }
  .body {
    width: 60%;
    min-width: 900px;
    background: #fff;
    height: calc(100vh - 200px);
    border-radius: 10px;
    margin: -100px auto 0;
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .nav {
      height: 100px;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .logo {
        width: 180px;
        height: 70px;
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
    .body-content {
      padding-right: 12px;
      margin-right: -12px;
      overflow: hidden;
      overflow-y: scroll;
      height: calc(100% - 320px);
      // margin-bottom: 120px;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        padding: 10px;
        margin: 20px 0 20px 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        .pic {
          width: 200px;
          height: 100px;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .text {
          flex: 1 1 50%;
          padding: 5px 20px;
          overflow: hidden;
        }
      }
    }
    .title {
      padding: 20px 20px 5px;
      font-weight: bold;
    }
    .patment {
      padding: 20px 0;
      overflow: hidden;
      .list {
        display: flex;
      }
      .item {
        width: 200px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 20px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 0 20px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover,
        &.active {
          transition: all 0.2s;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
      }
      .iconfont {
        font-size: 26px;
      }
      .icon {
        font-size: 40px;
        width: 15px;
        height: 45px;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          object-fit: contain;
        }
      }
    }
  }
  .price {
    font-weight: bold;
    color: rgb(161, 0, 0);
    font-size: 26px;
  }
  .foot {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 80px;
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 60%;
      min-width: 900px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .btn {
        width: 200px;
        background: rgb(161, 0, 0);
        height: 80px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 80px;
        opacity: 0.9;
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      width: 300px;
      height: 120px;
      background: #fff;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      overflow: hidden;
      .title {
        height: 49px;
        text-align: center;
        line-height: 49px;
        border-bottom: 1px solid #ccc;
        font-size: 18px;
      }
      .btn {
        display: flex;
        justify-content: center;
        height: 70px;
        > div {
          height: 100%;
          line-height: 70px;
          font-size: 22px;
          text-align: center;
          flex: 1 1 auto;
          &:first-child {
            border-right: 1px solid #ccc;
          }
          &:hover {
            background: #eee;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>