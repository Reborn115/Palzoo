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
      <view class="header">
        <view class="details">
          <view class="avator">
            <u--image
              :fade="true"
              duration="450"
              :lazy-load="true"
              :showLoading="true"
              :src="avatorurl"
              width="80px"
              height="80px"
              @click="click"
              shape="circle"
            ></u--image>
          </view>
          <view class="text">
            <text class="nametext">{{ info.username }}</text>
            <text class="schooltext">天津理工大学</text>
          </view>
        </view>
        <view class="post">
          <view class="commom">
            <view>1</view>
            <view class="commomtitle">组队</view>
          </view>
          <div class="line" />
          <view class="commom">
            <view>1</view>
            <view class="commomtitle">关注</view>
          </view>
          <div class="line" />
          <view class="commom">
            <view>1</view>
            <view class="commomtitle">粉丝</view>
          </view>
        </view>
      </view>
      <view class="list" v-for="(item, index) in tips" :key="index">
        <view class="item">
          <view class="time">{{ item.goTime }}</view>
        </view>
        <uni-card :is-shadow="false" class="container" :key="index">
          <view class="title">
            <h3>{{ item.title }}</h3>
          </view>
          <view>
            <u-tag
              :text="item.category"
              type="info"
              shape="circle"
              plain
              borderColor="#EFEFEF"
            ></u-tag>
          </view>
        </uni-card>
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      info: {},
      src: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
      avatorurl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
      name: "肥肥鲨",
      school: "天津理工大学",
      openid: uni.getStorageSync("openid"),
      userId: "0",
      tips: [
        {
          gotime: "2023-01-05 17:00",
          category: "运动",
        },
      ],
    };
  },
  onLoad(e) {
    this.getInfo();
    this.getPost();
  },
  methods: {
    async getInfo() {
      let openId = String(this.openid);
      const { data: res } = await request(
        "/control/user/info/get" +
          "?openId=" +
          openId +
          "&userId=" +
          this.userId,
        "GET"
      );
      this.info = res;
      console.log(this.info.username);
    },
    async getPost() {
      let openId = String(this.openid);
      const { data: res } = await request(
        "/controller/topic/author" + "?openId=" + openId,
        "GET"
      );
      console.log(res.waterfalls);
      this.tips = res.waterfalls;
      console.log(this.tips);
    },
  },
};
</script>

<style lang="scss" scoped>
.time {
  margin-left: 2vw;
  font-size: 15px;
}
::v-deep .u-tag {
  width: 8vw;
}
.title {
  font-size: 17px;
  font-weight: bold;
  color: black;
  margin-bottom: 1vh;
}
::v-deep .uni-card__content {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
::v-deep .uni-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // display: flex;
  // flex-direction: row !important;
  margin: 0 !important;
  margin-top: 1vh !important;
  // padding: 0 !important;
  border-radius: 10px;
  height: 11vh;
  width: 83.5vw;
  box-shadow: 5px 5px 8px #bebebe !important;
}
.list {
  flex-direction: column;
  margin-top: 2vh;
  display: flex;
}
.line {
  color: #9a9a9a;
  float: left;
  width: 0.1em;
  height: 3em;
  margin-right: 0.01em;
  margin-left: 0.01em;
  background: #9a9a9a;
}
.details {
  display: flex;

  .avator {
    margin-left: 8vw;
  }
  .text {
    // color: white;
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
.post {
  display: flex;
  justify-content: space-around;
  .commom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vw;
    .commomtitle {
      margin-top: 1vh;
    }
  }
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // margin-left: 5vw;
  width: 100vw;
  position: relative;
  top: -8vh;
  height: 60vh;
  // background-color: aqua;
  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // align-items: center;
    border-radius: 10px;
    height: 25vh;
    width: 90vw;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2);
  }
}
// .bgimg {
//   height: 20vh;
//   background-image: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg";
// }
</style>
