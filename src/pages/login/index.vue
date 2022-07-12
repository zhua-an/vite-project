<template>
	<div class="login-container">
    <div class="login-weaper">
      <div class="login-left animate__animated animate__fadeInLeft">
        <img class="img"
             src="@/assets/logo.png"
             alt="">
        <p class="title">{{ $t('ui.login.info') }}</p>
      </div>
      <div class="login-border animate__animated animate__fadeInRight">
        <div class="login-main">
          <p class="login-title">
            {{ $t('ui.login.title') }}{{ $t('ui.login.info') }}
            <lang>
              <svg-icon name="fanyiline"></svg-icon>
            </lang>
          </p>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <div class="login-menu">
            <a href="#"
               @click.stop="activeName='user'">{{ $t('ui.login.userLogin') }}</a>
            <a href="#"
               @click.stop="activeName='code'">{{ $t('ui.login.phoneLogin') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import app from "@/constants/app";
import { i18n } from "@/i18n";
import userLogin from "./userlogin.vue";
import codeLogin from "./codelogin.vue";

const activeName = ref('user')

</script>

<style lang="scss">
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  &::before{
    content:' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/img/login/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}
.login-weaper {
  margin: 0 auto;
  width:100%;
}

.login-left,
.login-border {
  position: relative;
  min-height: 500px;
  align-items: center;
  display: flex;
}
.login-left {
  justify-content: center;
  flex-direction: column;
  color: #fff;
  float: left;
  width: 50%;
  position: relative;
  box-sizing: border-box;
}
.login-left .img {
  width: 200px;
}
.login-time {
  position: absolute;
  left: 25px;
  top: 25px;
  width: 100%;
  color: #fff;
  font-weight: 200;
  opacity: 0.9;
  font-size: 18px;
  overflow: hidden;
  font-weight: bold;
}
.login-left .title {
  margin-top: 60px;
  text-align: center;
  color: #fff;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 28px;
  font-weight: bold;
}

.login-border {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  width: 50%;
  float: left;
  box-sizing: border-box;
}
.login-main {
  margin: 0 auto;
  padding: 30px 50px;
  width: 70%;
  box-shadow: -4px 5px 10px rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-title {
  color: #000;
  margin-bottom: 50px;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  letter-spacing: 4px;
}
.login-menu {
  margin-top: 40px;
  width: 100%;
  text-align: center;
  a {
    color: #999;
    font-size: 12px;
    margin: 0px 8px;
  }
}
.login-submit {
  width: 100%;
  height: 45px;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 300;
  cursor: pointer;
  margin-top: 30px;
  font-family: "neo";
  transition: 0.25s;
}
.login-form {
  margin: 10px 0;
  i {
    color: #333;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 18px;
  }
  .el-input {
    input {
      padding:20px 0 20px 40px;
      text-indent: 5px;
      border-radius: 5;
    }
    .el-input__suffix,.el-input__prefix{
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
}
.login-code {
  width: 100%;
  height: 100%;
}
.login-code-img {
  min-width: 100px;
  padding: 0 5px;
  height: 100%;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
  box-sizing: border-box;
}
</style>
