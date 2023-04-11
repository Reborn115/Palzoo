<template>
  <view>
    <view class="bgimg">
      <u--image
        :showLoading="true"
        :src="src"
        width="100vw"
        height="28vh"
      ></u--image>
    </view>
    <view class="body">
      <view class="details"></view>
      <view class="post"> </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
    };
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin-left: 5vw;
  width: 90vw;
  position: relative;
  top: -8vh;
  height: 60vh;
  background-color: aqua;
}
// .bgimg {
//   height: 20vh;
//   background-image: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg";
// }
</style>
