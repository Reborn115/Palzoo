<template>
  <view class="content">
    <u-button
      type="success"
      text="微信登录"
      @click="login(this.code)"
    ></u-button>
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
  },
  methods: {
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
.content {
  // height: 100vh;
  display: flex;
  padding-top: 70vh;
  // align-items: center;
  // justify-content: center;
}
</style>
