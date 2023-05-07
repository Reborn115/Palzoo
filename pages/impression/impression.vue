<template>
  <view class="container">
    <view class="tabs">
      <u-tabs
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
        <template #right>
          <!-- <div class="line" /> -->
        </template>
      </u-tabs>
    </view>
    <view class="images">
      <u-album
        :urls="urls"
        maxCount="999"
        rowCount="2"
        multipleSize="40vw"
      ></u-album>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      urls: [
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/b6kghbOZ",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/n1Eq5fF7",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/pfNFm17f",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/uC0QLGXw",
      ],
      tabslist: [],
      roomInfoList: [],
      currentTabIndex: 0,
    };
  },
  onLoad() {
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
      const { data: res } = await request("/show/rooms", "GET");
      console.log(res);
      this.roomInfoList = res.roomInfoList;
      console.log("roomInfoList", this.roomInfoList);
      this.urls = this.roomInfoList[0].images;
    },
    async getRoomList() {
      const { data: res } = await request("/list/type", "GET");
      console.log(res);
      this.tabslist = res.typeNameList;
    },
    // changeTab(index) {
    //   console.log("这是index", index);
    //   if (this.currentTabIndex != index.index) {
    //     this.currentTabIndex = index.index;
    //     console.log(this.currentTabIndex);
    //   }
    // },
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
}
.tabs {
  margin-top: 1vh;
  width: 90vw;
}
</style>
