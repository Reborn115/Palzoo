<template>
  <view class="container">
    <view class="title">———— 常见问题 —————</view>
    <view class="cover">
      <u--image
        :showLoading="true"
        :src="bgImg"
        width="85vw"
        height="26vh"
        mode="widthFix"
      ></u--image>
    </view>
    <view class="content">
      <view
        class="item"
        @click="goDetail(item)"
        v-for="(item, index) in problemList"
        :key="index"
      >
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      problemList: [],
      bgImg:
        "https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E9%A6%96%E9%A1%B5%E5%9B%BE.png",
    };
  },
  onLoad() {
    this.getProblem();
  },
  methods: {
    goDetail(item) {
      uni.setStorage({
        key: "title",
        data: item.title,
      });
      uni.setStorage({
        key: "content",
        data: item.content,
      });
      uni.navigateTo({
        url: "/pages/mine/commonProblem/problemDetail/problemDetail",
      });
    },
    async getProblem() {
      const { data: res } = await request("/show/problems", "GET");
      // console.log(res);
      this.problemList = res.problemList;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 1vh;
  font-size: 13px;
  padding-left: 4vw;
  display: flex;
  align-items: center;
  height: 6vh;
  width: 81vw;
  background-color: #8dc26f;
  // color: white;
}
.cover {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.title {
  font-weight: bold;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2vh;
}
.content {
  padding-bottom: 3vh;
}
</style>
