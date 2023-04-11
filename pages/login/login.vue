<template>
  <view class="content">
    <u-button
      type="success"
      text="微信登录"
      @click="login(this.code)"
    ></u-button>
    <view class="linkbox">
      <text @click="goHome"> 稍后进行登录 </text>
      <u-icon name="arrow-right-double" color="#3c9cff;"></u-icon>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import request from "@/request/request.js";

export default {
  data() {
    return {
      title: "Hello",
      code: uni.getStorageSync("code"),
    };
  },

  onLoad() {
    console.log("App Show");
    // 从storage获取登录信息，没有则需要登录
    let tokenInfo = uni.getStorageSync("tokenInfo");
    let hasValidToken = false;
    if (tokenInfo) {
      let time = new Date().valueOf();
      // 存储时间小于token失效时间，才是有效token, 否则重新授权
      hasValidToken = time - tokenInfo.timestamp < 3600 * 24 * 1000;
    }
    if (!hasValidToken) {
      // 调用小程序登录api
      uni.login({
        provider: "weixin",
        success: (wxInfo) => {
          uni.setStorage({
            key: "code",
            data: wxInfo.code,
          });
          this.code = wxInfo.code;
          console.log("获得code", wxInfo.code);
          console.log("修改code", this.code);
        },
      });
    }
    if (!uni.getStorageSync("openid")) {
      this.showToast({
        type: "error",
        message: "登录后体验更多功能",
      });
    }
  },
  methods: {
    goHome() {
      console.log("555");

      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,
        complete() {
          params.url &&
            uni.switchTab({
              url: params.url,
            });
        },
      });
    },
    appLoginWx() {
      // 获取用户信息
      // 注意 getUserProfile 不支持在事件中使用异步操作
      // 否则会触发错误：{errMsg: "getUserProfile:fail can only be invoked by user TAP gesture."}
      uni.getUserProfile({
        lang: "zh_CN",
        desc: "获取用户信息",
        success: (userInfo) => {
          console.log(userInfo, "userInfo");
          // uni.login({
          //   provider: "weixin",
          //   success: (loginInfo) => {
          //     console.log(loginInfo, "loginInfo");
          //   },
          // });
        },
        fail: (err) => {
          console.log(err, "err");
        },
      });
    },
    async login(code) {
      const { data: res } = await request("/control/sign/in", "POST", {
        code: code,
      });
      uni.setStorage({
        key: "sessionKey",
        data: res.sessionKey,
      });
      uni.setStorage({
        key: "openid",
        data: res.openid,
      });
      this.appLoginWx();
      this.showToast({
        type: "success",
        message: "登录成功",
        url: "/pages/index/index",
      });
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.linkbox {
  margin-top: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3c9cff;
}
.content {
  // height: 100vh;
  display: flex;
  padding-top: 50vh;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
}
</style>
