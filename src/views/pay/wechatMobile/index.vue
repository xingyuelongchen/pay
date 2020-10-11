<!--
Template Name: 微信获取code并唤起支付
Create author: qinglong
Create Time  : 2020-09-17
-->
<template>
  <div>微信获取code并唤起支付</div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      code: null,
    };
  },
  created() {
    let arr = window.location.search
      .replace(/\?/, "")
      .split("&")
      .map((e) => e.split("="));
    let obj = {};
    arr.forEach((e) => {
      obj[e[0]] = e[1];
    });
    this.code = obj.code;
    if (this.code) {
      // 如果获取到code 就调用后台获取支付数据
      this.getPay();
    }
  },
  methods: {
    async getPay() {
      // 通过code获取用户支付数据，唤起微信内置支付
      let { data } = await this.axios("/", {
        data: { code: this.code },
      });
      if (data.code) {
        this.wechatPay(data.data);
      }
    },
    wechatPay(params) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            () => this.onBridgeReady(params),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", () =>
            this.onBridgeReady(params)
          );
          document.attachEvent("onWeixinJSBridgeReady", () =>
            this.onBridgeReady(params)
          );
        }
      } else {
        this.onBridgeReady(params);
      }
    },
    onBridgeReady(params) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", params, (res) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          alert("支付成功");
          window.history.go(-2);
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          alert("支付失败");
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          alert("取消支付");
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
</style>