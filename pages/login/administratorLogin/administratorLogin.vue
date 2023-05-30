<template class="body">
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <u--image
      mode="widthFix"
      :showLoading="true"
      :src="imgUrl"
      width="280px"
      height="280px"
    ></u--image>
    <uni-forms
      :modelValue="formData"
      :rules="rules"
      ref="formData"
      class="formNormal"
    >
      <uni-forms-item name="account" class="inputNormal">
        <uni-easyinput
          prefixIcon="person"
          type="text"
          v-model="formData.account"
          placeholder="请输入账号"
          placeholderStyle="color:#EEDFC9;font-size:15px"
        />
      </uni-forms-item>
      <uni-forms-item name="password" class="inputNormal">
        <uni-easyinput
          prefixIcon="locked"
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
          placeholderStyle="color:#EEDFC9;font-size:15px"
        />
      </uni-forms-item>
      <button type="primary" @click="submit('formData')" class="bottonNormal">
        登录
      </button>
    </uni-forms>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      imgUrl:
        "https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E5%89%AF%E9%A1%B5.png",
      formData: {
        account: "",
        password: "",
      },
      range: [{ value: 1, text: "" }],
      rules: {
        account: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请填写账号",
            },
            {
              minLength: 1,
              maxLength: 12,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "账号",
          validateTrigger: "submit",
        },
        password: {
          //密码检验
          rules: [
            {
              required: true,
              errorMessage: "请填写密码",
            },
            {
              minLength: 6,
              maxLength: 12,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "密码",
          validateTrigger: "submit",
        },
      },
    };
  },
  onLoad() {},
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
    async login() {
      const { data: res } = await request("/login", "POST", {
        username: this.formData.account,
        password: this.formData.password,
      });
      console.log(res);
      if (res) {
        uni.setStorage({
          key: "token",
          data: res.token,
        });
        this.showToast({
          type: "success",
          message: "登录成功",
          url: "/pages/administrators/index/index",
        });
      }
    },
    goHome() {
      uni.navigateTo({
        url: "/pages/childs/home/home",
      });
    },
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then((res) => {
          this.login();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .uni-icons {
  color: #8dc26f !important;
}
::v-deep .uni-easyinput__content-input {
  height: 75rpx;
}

.container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container input {
  outline: none;
  padding: 10px;
  width: 100%;
  border: solid 1px #ececec;
  border: radius 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  height: 80px;
}

::v-deep .uni-easyinput {
  width: 60vw !important;
  outline: none !important;
  border-style: none !important;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}
::v-deep .uni-forms-item__label {
  display: none;
  visibility: hidden !important;
  padding: 0;
}

.bottonNormal {
  border-radius: 20px;
  background-color: #8dc26f;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 60vw;
  height: 80rpx;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
}
.formNormal {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 70vw;
}
::v-deep .uni-forms {
  margin-left: 5vw;
  padding-top: 60rpx;
  width: 80vw;
  align-items: center;
  justify-content: center;
  display: flex;
}
::v-deep .uni-forms-item {
  margin-bottom: 80rpx;
}
.body {
  background-color: #8dc26f;
  position: relative;
  z-index: 0; // 支付宝小程序下背景不生效时，可以加上这个
}
</style>
