<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <view class="select">
      <uni-data-select
        v-model="typeId"
        :localdata="tabslist"
        @change="change"
      ></uni-data-select>
    </view>
    <view class="botton">
      <u-button type="primary" text="删除场地" @click="submit"></u-button>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      typeId: 0,
      tabslist: [],
    };
  },
  onLoad() {
    this.getRoomList();
  },
  methods: {
    async submit() {
      let data = {
        typeId: this.typeId,
      };

      const res = await tokenRequest("/delete/room", "POST", data);
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
    },
    change(e) {
      this.typeId = e;
      console.log("this.typeId", this.typeId);
    },
    async getRoomList() {
      const { data: res } = await request("/list/type", "GET");
      console.log(res);
      this.tabslist = JSON.parse(
        JSON.stringify(res.typeNameList).replace(/id/g, "value")
      );
      this.tabslist = JSON.parse(
        JSON.stringify(this.tabslist).replace(/name/g, "text")
      );
      console.log("this.tabslist", this.tabslist);
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.select {
  width: 90vw;
  margin-top: 4vh;
  margin-bottom: 1vh;
}
</style>
