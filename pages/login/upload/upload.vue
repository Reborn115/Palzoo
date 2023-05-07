<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view class="avatar">
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <u--image
          :showLoading="true"
          :src="avatarUrl"
          width="80px"
          height="80px"
          @click="click"
        ></u--image>
        <view class="avatartext" v-if="this.avatarUrl == this.defaultAvatarUrl">
          点击上传头像
        </view>
      </button>
    </view>
    <view class="nickname">
      <view class="nicknametext"> 昵称 </view>
      <view>
        <input
          type="nickname"
          class="weui-input"
          placeholder="请输入昵称"
          v-model="this.userName"
          @change="getNickname"
        />
      </view>
    </view>
    <view class="submit">
      <u-button type="success" text="保存资料" @click="saveInfo()"></u-button>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      userName: "",
      defaultAvatarUrl:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      avatarUrl:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    };
  },
  onLoad(e) {
    this.showToast({
      type: "primary",
      message: "请完善用户信息",
    });
  },
  methods: {
    uploadFilePromise() {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "http://www.haorui.xyz:9598/upload/user", // 仅为示例，非真实的接口地址
          filePath: this.avatarUrl,
          name: "file",
          formData: {
            openid: uni.getStorageSync("openid"),
            username: this.userName,
          },
          header: {
            "content-type": "application/json",
          },
          success: (res) => {
            res = JSON.parse(res.data);
            console.log("上传头像", res);
            uni.setStorage({
              key: "avatarUrl",
              data: res.message,
            });
            console.log("上传头像", uni.getStorageSync("avatarUrl"));
            // console.log(res.data.files[0].fileUrl);
            // this.headPicUrl = res.data.files[0].fileUrl;
            setTimeout(() => {
              resolve(res);
            }, 1000);
          },
        });
      });
    },
    async saveInfo() {
      console.log(this.userName, this.avatarUrl);
      this.uploadFilePromise();
      // if (this.userName && this.avatarUrl != this.defaultAvatarUrl) {
      //   let data = {
      //     openId: uni.getStorageSync("openid"),
      //     userName: this.userName,
      //     // avatarUrl: this.avatarUrl,
      //   };
      //   const { data: res } = await request(
      //     "/control/user/info/update",
      //     "POST",
      //     data
      //   );
      //   console.log(res);

      uni.setStorage({
        key: "userName",
        data: this.userName,
      });

      this.showToast({
        type: "success",
        message: "保存成功",
        url: "/pages/index/index",
      });
      // } else {
      //   console.log("没进来");
      // }
    },
    getNickname(e) {
      console.log("nickname", e.detail.value);
      this.userName = e.detail.value;
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

    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.avatarUrl = avatarUrl;
      console.log(avatarUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-button {
  width: 80vw !important;
}
.submit {
  margin-top: 10vh;
}
.nicknametext {
  margin-left: 10vw;
  margin-right: 10vw;
}
.nickname {
  display: flex;
  margin-top: 10vh;
}
.avatartext {
  font-size: 12px;
}
.avatar-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  padding: 0;
}
.avatar {
  margin-top: 20vh;
  display: flex;
  align-items: center;
}
</style>
