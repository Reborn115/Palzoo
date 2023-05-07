<template>
  <view class="content">
    <view class="horn">
      <u-notice-bar
        :text="hornText"
        mode="closable"
        color="#8DC26F"
      ></u-notice-bar>
    </view>
    <view class="swiper">
      <u-swiper
        keyName="image"
        :list="swiperList"
        previousMargin="30"
        nextMargin="30"
        circular
        :autoplay="true"
        radius="5"
        bgColor="#ffffff"
        indicator
        indicatorMode="line"
      ></u-swiper>
    </view>
    <view class="timeandaddress">
      <uni-card :is-shadow="false">
        <view class="info">
          <view>
            <text class="title">营业时间：</text>
            <text>{{ timeandaddress.time }}</text>
          </view>

          <view>
            <text class="title">地址：</text>
            <text>{{ timeandaddress.address }}</text>
          </view>
        </view>
        <view class="pickbotton">
          <u-button
            text="预定"
            color="linear-gradient(to bottom, #76b852, #8DC26F)"
            shape="circle"
            @click="pageJump('/pages/index/subscribe/subscribe')"
          ></u-button>
        </view>
      </uni-card>
    </view>
    <view class="description">
      <view class="venues"> 场地介绍 </view>
      <view class="collapse">
        <u-collapse @change="change" @close="close" @open="open" accordion>
          <u-collapse-item
            :title="item.type"
            v-for="(item, index) in roomInfoList"
            :key="index"
          >
            <view class="type"> {{ item.type }}</view>
            <view class="brief">{{ "——（" + item.brief + "）" }} </view>
            <view class="gap">简介</view>
            <view class="more">{{ item.more }}</view>
            <view class="gap">留影</view>
            <view class="images">
              <u-album
                :urls="item.images"
                maxCount="999"
                rowCount="2"
                multipleSize="36vw"
                singleSize="73vw"
              ></u-album>
            </view>
            <view class="gap">开场送</view>
            <view class="send"> {{ item.send }} </view>
          </u-collapse-item>
        </u-collapse>
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
import uText from "../../uni_modules/uview-plus/components/u--text/u--text.vue";
export default {
  components: { uText },
  data() {
    return {
      roomInfoList: [],
      urls1: [
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/b6kghbOZ",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/n1Eq5fF7",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/pfNFm17f",
        "http://rtk2m6fyw.hb-bkt.clouddn.com//集装箱/uC0QLGXw",
      ],
      timeandaddress: {
        time: "09:：00-21:00",
        address:
          "天津市西青区精武镇团泊大道中华武林园内凯伦田元智能体育休闲营地",
      },
      current: 0,
      swiperList: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          type: "image",
        },
        {
          image: "https://s2.loli.net/2023/04/17/guR53vfPWOXYTCc.jpg",
          type: "image",
        },
        {
          image: "https://s2.loli.net/2023/04/17/guR53vfPWOXYTCc.jpg",
          type: "image",
        },
      ],
      hornText:
        "天津市西青区精武镇团泊大道中华武林园内凯伦田元智能体育休闲营地现接受预订",
    };
  },
  onReachBottom() {},
  onPullDownRefresh() {},
  onLoad() {
    this.getRoomInfo();
  },
  methods: {
    pageJump(url) {
      uni.navigateTo({
        url: url,
      });
    },
    async getRoomInfo() {
      const { data: res } = await request("/show/rooms", "GET");
      console.log(res);
      this.roomInfoList = res.roomInfoList;
    },
    open(e) {
      // console.log('open', e)
    },
    close(e) {
      // console.log('close', e)
    },
    change(e) {
      // console.log('change', e)
    },
  },
};
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  justify-content: center;
}

.gap {
  padding-left: 2vw;
  line-height: 5vh;
  height: 5vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  background-color: #8dc26f;
  color: white;
}
::v-deep .u-gap {
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.brief {
  margin-top: 1vh;
}
.type {
  font-size: 18px;
  font-weight: bold;
}
.collapse {
  margin-top: 3vh;
  margin-left: 4vw;
  align-items: center;
  width: 85vw;
}
.venues {
  margin-top: 2vh;
  margin-left: 5vw;
  font-size: 14px;
  font-weight: bold;
  color: black;
}
.description {
  border-radius: 10px;
  padding-bottom: 4vh;
  background-color: white;
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 93vw;
}
.swiper {
  margin-top: 3vh;
  height: 20vh;
  width: 90vw;
}
.info {
  width: 60vw;
  height: 18vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 13px;
}
::v-deep .uni-card__content {
  display: flex !important;
}
.pickbotton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 18vh;
}
::v-deep .u-button {
  width: 20vw !important;
  height: 5vh !important;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: black;
}
.timeandaddress {
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 22vh;
  width: 100vw;
}
::v-deep .uni-card {
  // display: flex;
  // flex-direction: row !important;
  margin: 0 !important;
  margin-top: 2vh !important;
  // padding: 0 !important;
  border-radius: 10px;
  height: 21vh;
  width: 88vw;
  box-shadow: 5px 5px 8px #bebebe !important;
}
.horn {
  margin-top: 2vh;
  width: 90vw;
}
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
