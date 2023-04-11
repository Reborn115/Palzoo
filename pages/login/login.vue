<template>
  <view class="content">
    <u--image
      mode="widthFix"
      :showLoading="true"
      :src="imgUrl"
      width="280px"
      height="280px"
      @click="click"
    ></u--image>
    <u-button
      type="success"
      text="微信登录"
      @click="login(this.code)"
    ></u-button>
    <u-button
      type="primary"
      text="账号密码登录(测试)"
      @click="login(this.code)"
    ></u-button>
    <view class="privacy">
      <uni-data-checkbox
        multiple
        :localdata="range"
        @change="change"
        class="checkbotton"
      ></uni-data-checkbox>
      <text>已阅读并同意</text>
      <uni-link
        href="https://www.yuleng.top/app-huimao-yszc/"
        text="Palzoo隐私协议"
        color="#CF6A1B"
        font-weight="bold"
        showUnderLine="false"
      ></uni-link>
    </view>
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
      imgUrl: "https://s2.loli.net/2023/04/11/Xflh5kKy3WqdVGI.png",
      title: "Hello",
      code: uni.getStorageSync("code"),
      range: [{ value: 1, text: "" }],
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
    change(e) {
      this.isPrivacy = !this.isPrivacy;
    },
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
      if (!this.isPrivacy) {
        this.showToast({
          type: "error",
          message: "请同意隐私政策",
        });
      } else {
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-button {
  width: 90vw !important;
  margin-bottom: 3vh;
  border-radius: 10px !important;
}
.privacy {
  margin-bottom: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text {
    font-size: 13.5px;
  }
}
.linkbox {
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3c9cff;
}
.content {
  // height: 100vh;
  // justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 15vh;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
}
</style>
