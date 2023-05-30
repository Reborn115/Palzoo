<template>
  <view class="container">
    <view class="title">{{ title }}</view>
    <view class="content">{{ content }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  onLoad() {
    this.title = uni.getStorageSync("title");
    this.content = uni.getStorageSync("content");
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 5vh;
  margin-left: 5vw;
  font-weight: bold;
}
.content {
  margin-top: 5vh;
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: 14px;
}
</style>
