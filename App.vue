<script>
export default {
  // onLaunch: function () {
  //   console.log("App Show");
  //   // 从storage获取登录信息，没有则需要登录
  //   let tokenInfo = uni.getStorageSync("tokenInfo");
  //   let hasValidToken = false;
  //   if (tokenInfo) {
  //     let time = new Date().valueOf();
  //     // 存储时间小于token失效时间，才是有效token, 否则重新授权
  //     hasValidToken = time - tokenInfo.timestamp < 3600 * 24 * 1000;
  //   }
  //   if (!hasValidToken) {
  //     // 调用小程序登录api
  //     uni.login({
  //       provider: "weixin",
  //       success: (wxInfo) => {
  //         uni.setStorage({
  //           key: "code",
  //           data: wxInfo.code,
  //         });
  //         console.log("获得code", wxInfo.code);
  //         uni.request({
  //           url: "/login", //仅为示例，并非真实接口地址。
  //           data: {
  //             code: wxInfo.code,
  //           },
  //           success: (res) => {
  //             //获得token完成登录
  //             uni.setStorage({
  //               key: "tokenInfo",
  //               data: {
  //                 token: res.token,
  //                 timestamp: new Date().valueOf(),
  //               },
  //             });
  //           },
  //         });
  //       },
  //     });
  //   }
  // },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
page {
  background-color: #f8f8f8;
}
</style>

<style lang="scss" scoped>
@import "@/uni_modules/uview-plus/index.scss";
/*每个页面公共css */
</style>
