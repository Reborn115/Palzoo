<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <view class="title"> </view>
    <view class="content">
      <u--textarea
        v-model="hornText"
        placeholder="请输入内容"
        count
      ></u--textarea>
    </view>
    <view class="botton">
      <u-button type="primary" text="保存更改" @click="submit"></u-button>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      hornText: "",
    };
  },
  onLoad() {
    this.getHornText();
  },
  methods: {
    async getHornText() {
      const { data: res } = await request("/broadcast/show", "GET");
      // console.log(res);
      this.hornText = res.hornText;
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,
        complete() {
          params.url &&
            uni.navigateTo({
              url: params.url,
            });
        },
      });
    },
    async submit() {
      let data = {
        hornText: this.hornText,
        // token: uni.getStorageSync("token"),
      };
      if (this.hornText) {
        const res = await tokenRequest("/broadcast/modify", "POST", data);
        console.log("res", res);
        if (res.code == "00000") {
          this.showToast({
            type: "success",
            message: res.message,
            url: "/pages/administrators/index/index",
          });
        } else {
          this.showToast({
            type: "error",
            message: res.message,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.content {
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
}
::v-deep .u-button {
  margin-top: 5vh;
  width: 90vw !important;
  margin-bottom: 3vh;
  border-radius: 10px !important;
}
</style>
