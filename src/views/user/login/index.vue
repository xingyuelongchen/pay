<!--
Template Name: login
Create author: qinglong
Create Time  : 2020-09-16
-->
<template>
  <div class="login">
    <div class="box">
      <div class="login-title">用户登录</div>
      <el-form :model="ruleForm" status-icon ref="login" label-width="80px">
        <el-form-item label="手机号码" prop="mobile" :rules="{required:true,message:'请输入账号'}">
          <el-input clearable v-model="ruleForm.mobile" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="{required:true,message:'请输入密码'}">
          <el-input clearable type="password" v-model="ruleForm.password" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" :rules="{required:true,message:'请输入验证码'}">
          <div class="yzm">
            <div class="code" @click="getCode">
              <img :src="code" alt='验证码' />
            </div>
            <el-input clearable v-model="ruleForm.code" autocomplete="on"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login" style="width:100%">确认{{title}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return { ruleForm: {}, code: "", title: "登录" };
  },
  created() {
    this.getCode();
  },
  methods: {
    async getCode() {
      this.axios
        .get("/adminapi/Login/verify?v=" + Math.random(), {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "image/png; charset=utf-8",
          },
        })
        .then((e) => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(e.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((data) => {
          this.code = data;
        });
    },
    login() {
      console.log("login");
    },
  },
};
</script>
<style lang='less' scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/image/bg_login.jpg") no-repeat center center / 100%
    100%;
  .box {
    width: 400px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    .login-title {
      margin: 0px auto 20px;
      text-align: center;
      font-size: 22px;
    }
    .yzm {
      overflow: hidden;
      .el-input {
        width: 60%;
        float: left;
      }
      .code {
        width: 100px;
        float: right;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>