<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view class="content">
      <view class="box">
        <view class="title"> 场地类型 </view>
        <uni-easyinput
          type="text"
          v-model="form.type"
          placeholder="请输入场地类型"
        />
      </view>
      <view class="box">
        <view class="title"> 场地简介 </view>
        <u--textarea
          v-model="form.brief"
          placeholder="请输入简介"
          count
        ></u--textarea>
      </view>
      <view class="box">
        <view class="title"> 场地详细介绍 </view>
        <u--textarea
          v-model="form.more"
          placeholder="请输入详细介绍"
          count
        ></u--textarea>
      </view>
      <view class="box">
        <view class="title"> 免费送内容 </view>
        <u--textarea
          v-model="form.send"
          placeholder="请输入免费送内容"
          count
        ></u--textarea>
      </view>
      <view class="botton">
        <u-button type="primary" text="新增" @click="submit"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      form: {
        type: "",
        brief: "",
        more: "",
        send: "",
      },
    };
  },
  methods: {
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
        type: this.form.type,
        brief: this.form.brief,
        more: this.form.more,
        send: this.form.send,
        token: uni.getStorageSync("token"),
      };

      const res = await tokenRequest("/add/room", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.showToast({
          type: "success",
          message: res.message,
          // url: "/pages/administrators/index/index",
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-button {
  margin-top: 5vh;
  width: 90vw !important;
  margin-bottom: 3vh;
  border-radius: 10px !important;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  margin-top: 3vh;
  width: 90vw;
}
.title {
  margin-bottom: 1vh;
  font-weight: bold;
}
</style>
