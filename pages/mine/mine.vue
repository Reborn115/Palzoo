<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <u-modal
      :content="content"
      :show="isConfirm"
      showCancelButton
      closeOnClickOverlay
      @confirm="confirm"
      @cancel="cancel"
      @close="close"
    ></u-modal>
    <view class="header">
      <view class="avator">
        <u--image
          :fade="true"
          duration="450"
          :lazy-load="true"
          :showLoading="true"
          :src="info.avatarUrl"
          width="80px"
          height="80px"
          @click="click"
          shape="circle"
        ></u--image>
      </view>
      <view class="text">
        <text class="nametext">{{ info.username }}</text>
        <!-- <text class="schooltext">19179755936</text> -->
      </view>
    </view>
    <view class="select">
      <view class="upselect">
        <u-cell-group>
          <u-cell
            title="我的订单"
            isLink
            url="pages/myOrder/myOrder"
            linkType="switchTab"
          >
            <image
              slot="icon"
              src="https://cdn.uviewui.com/uview/demo/picker/2.png"
              mode="widthFix"
            ></image>
          </u-cell>
        </u-cell-group>
      </view>
      <view class="downselect">
        <u-cell
          title="常见问题"
          isLink
          url="pages/mine/commonProblem/commonProblem"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="预约说明"
          isLink
          url="pages/mine/appointmentInstructions/appointmentInstructions"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="关于开发者"
          isLink
          url="pages/mine/contactService/contactService"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell title="退出登录" @click="showConfirm" isLink>
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      content: "确定要退出登录吗？",
      isConfirm: false,
      info: {
        avatarUrl: uni.getStorageSync("avatarUrl"),
        username: uni.getStorageSync("username"),
      },

      userId: "0",
    };
  },
  // onLoad() {
  //   this.getInfo();
  // },
  onShow() {
    this.getInfo();
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
    // async logout() {
    //   let data = {
    //     openid: uni.getStorageSync("openid"),
    //   };
    //   const res = await request("/sign/off", "POST", data);
    //   this.isConfirm = false;
    //   if (res.code == "00000") {
    //     this.showToast({
    //       type: "success",
    //       message: res.message,
    //       url: "/pages/login/login",
    //     });
    //   } else {
    //     this.showToast({
    //       type: "error",
    //       message: res.message,
    //     });
    //   }
    //   console.log("res", res);
    // },
    cancel() {
      this.isConfirm = false;
    },
    confirm() {
      this.isConfirm = false;
      uni.removeStorageSync("openid");
      uni.navigateTo({
        url: "/pages/login/login",
      });
    },
    showConfirm() {
      this.isConfirm = true;
    },
    async getInfo() {
      const { data: res } = await request(
        "/get/avatar" + "?openid=" + uni.getStorageSync("openid"),
        "GET"
      );
      this.info = res;
      // console.log(this.info);
    },
  },
};
</script>

<style lang="scss" scoped>
.downselect {
  margin-top: 2vh;
  background-color: white;
}
.upselect {
  background-color: white;
  margin-top: 2vh;
}
.header {
  display: flex;
  //   justify-content: center;
  align-items: center;
  height: 20vh;
  background-color: #8dc26f;
  // background-image: linear-gradient(to bottom, #8dc26f, white) !important;
  .avator {
    margin-left: 8vw;
  }
  .text {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 10vh;
    .nametext {
      margin-left: 8vw;
    }
    .schooltext {
      font-size: 0.8rem;
      margin-left: 8vw;
    }
  }
}
</style>
