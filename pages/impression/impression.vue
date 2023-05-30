<template>
  <view class="container">
    <view class="tabs">
      <u-tabs
        :scrollable="true"
        @change="changeTab"
        :current="currentTabIndex"
        :list="tabslist"
        lineColor="#8dc26f"
        :activeStyle="{
          color: '#8dc26f',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#9A9A9A',
          transform: 'scale(1)',
        }"
        itemStyle="height: 34px;"
      >
      </u-tabs>
    </view>

    <view class="images">
      <!-- <u-skeleton rows="4" :loading="loading" :title="false"> -->
      <u-album
        :urls="urls"
        maxCount="999"
        rowCount="2"
        multipleSize="40vw"
      ></u-album>
      <!-- </u-skeleton> -->
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      loading: true,
      urls: [""],
      tabslist: [],
      roomInfoList: [],
      currentTabIndex: 0,
    };
  },
  onShow() {
    this.getRoomList();
    this.getRoomInfo();
    // this.getRoomStatus(1);
  },
  methods: {
    changeTab(index) {
      this.currentTabIndex = index.id - 1;
      this.urls = this.roomInfoList[this.currentTabIndex].images;
      // console.log(this.urls);
    },
    async getRoomInfo() {
      this.roomInfoList = uni.getStorageSync("roomInfoList");
      // const { data: res } = await request("/show/rooms", "GET");
      // // console.log(res);
      // this.roomInfoList = res.roomInfoList;
      // // console.log("roomInfoList", this.roomInfoList);
      this.urls = this.roomInfoList[0].images;
      // uni.$u.sleep(1000).then(() => {
      //   this.loading = false;
      // });
    },
    async getRoomList() {
      const { data: res } = await request("/list/type", "GET");
      // console.log(res);
      this.tabslist = res.typeNameList;
    },
  },
};
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  justify-content: center;
  margin-top: 2vh;
}
.container {
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
}
.tabs {
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
  margin-top: 1vh;
  width: 100%;
  // display: flex;
  // justify-content: space-around;
}
</style>
