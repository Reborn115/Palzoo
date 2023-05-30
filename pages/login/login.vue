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
      text="微信用户登录"
      @click="login(this.code)"
    ></u-button>
    <u-button
      type="primary"
      text="管理员登录"
      @click="goAdministrator"
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
        href=""
        text="凯伦田元隐私协议"
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
      isPrivacy: false,
      imgUrl:
        "https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E5%89%AF%E9%A1%B5.png",
      title: "Hello",
      code: uni.getStorageSync("code"),
      range: [{ value: 1, text: "" }],
      timer1: "",
      timer2: "",
    };
  },
  onShow() {
    if (!uni.getStorageSync("openid")) {
      this.showToast({
        type: "error",
        message: "登录后体验更多功能",
      });
    }
    // 从storage获取登录信息，没有则需要登录
    // let tokenInfo = uni.getStorageSync("tokenInfo");
    // let hasValidToken = false;
    // if (tokenInfo) {
    //   let time = new Date().valueOf();
    //   // 存储时间小于token失效时间，才是有效token, 否则重新授权
    //   hasValidToken = time - tokenInfo.timestamp < 3600 * 24 * 1000;
    // }
    // if (!hasValidToken) {
    // 调用小程序登录api
    uni.login({
      provider: "weixin",
      success: (wxInfo) => {
        uni.setStorage({
          key: "code",
          data: wxInfo.code,
        });
        this.code = wxInfo.code;
        // console.log("获得code", wxInfo.code);
        // console.log("修改code", this.code);
      },
    });
    // }
  },
  // onLoad() {
  //   if (!uni.getStorageSync("openid")) {
  //     this.showToast({
  //       type: "error",
  //       message: "登录后体验更多功能",
  //     });
  //   }
  //   // 从storage获取登录信息，没有则需要登录
  //   // let tokenInfo = uni.getStorageSync("tokenInfo");
  //   // let hasValidToken = false;
  //   // if (tokenInfo) {
  //   //   let time = new Date().valueOf();
  //   //   // 存储时间小于token失效时间，才是有效token, 否则重新授权
  //   //   hasValidToken = time - tokenInfo.timestamp < 3600 * 24 * 1000;
  //   // }
  //   // if (!hasValidToken) {
  //   // 调用小程序登录api
  //   uni.login({
  //     provider: "weixin",
  //     success: (wxInfo) => {
  //       uni.setStorage({
  //         key: "code",
  //         data: wxInfo.code,
  //       });
  //       this.code = wxInfo.code;
  //       // console.log("获得code", wxInfo.code);
  //       // console.log("修改code", this.code);
  //     },
  //   });
  //   // }
  // },
  methods: {
    goAdministrator() {
      uni.navigateTo({
        url: "/pages/login/administratorLogin/administratorLogin",
      });
    },
    async getUserInfo() {
      // console.log("进来了");

      // console.log(uni.getStorageSync("openid"));
      const { data: res } = await request(
        "/get/avatar" + "?openid=" + uni.getStorageSync("openid"),
        "GET"
      );
      // let data = {
      //   openid: uni.getStorageSync("openid"),
      // };
      // const { data: res } = await request("/get/avatar", "GET", data);
      // console.log(res);
      // console.log(res);
      uni.setStorage({
        key: "avatarUrl",
        data: res.avatarUrl,
      });
      uni.setStorage({
        key: "username",
        data: res.username,
      });
      // console.log(uni.getStorageSync("avatarUrl"));
      // console.log(uni.getStorageSync("username"));
      if (res) {
        this.timer2 = setTimeout(() => {
          if (
            uni.getStorageSync("avatarUrl") &&
            uni.getStorageSync("username")
          ) {
            this.showToast({
              type: "success",
              message: "登录成功",
              url: "/pages/index/index",
            });
          } else {
            this.showToast({
              type: "success",
              message: "登录成功,请填写用户信息",
            });
            this.goUploud();
          }
        }, 1000);
      }
    },
    goHome() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    change(e) {
      this.isPrivacy = !this.isPrivacy;
    },
    goUploud() {
      uni.navigateTo({
        url: "/pages/login/upload/upload",
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
    async login(code) {
      if (!this.isPrivacy) {
        this.showToast({
          type: "error",
          message: "请同意隐私政策",
        });
      } else {
        const res = await request("/sign/in", "POST", {
          code: code,
        });
        // console.log(res.data.openid);
        uni.setStorage({
          key: "openid",
          data: res.data.openid,
        });
        // console.log("openid", uni.getStorageSync("openid"));
        if (res.code == "00000") {
          // this.isPrivacy = false;
          // console.log("获取成功");
          this.timer1 = setTimeout(() => {
            this.getUserInfo();
          }, 300);
        }
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
