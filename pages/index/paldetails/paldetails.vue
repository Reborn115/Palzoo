<template>
  <view>
    <view class="header">
      <view class="info">
        <view class="avator">
          <u--image
            :fade="true"
            duration="450"
            :lazy-load="true"
            :showLoading="true"
            :src="avatorurl"
            width="40px"
            height="40px"
            @click="click"
            shape="circle"
          ></u--image>
        </view>
        <view class="introduce">
          <view class="name">{{ author.name }}</view>
          <view class="others">
            {{ author.gender }}
            <div class="line" />
            {{ author.year + "岁" }}
            <div class="line" />
            {{ author.school }}
          </view>
        </view>
      </view>
      <view class="concern">
        <u-button
          text="关注"
          color="linear-gradient(to bottom, #29A7FE, #62DFE5)"
          shape="circle"
        ></u-button>
      </view>
    </view>
    <view class="container">
      <view class="title">
        {{ title }}
      </view>
      <view class="detailbox">
        <view class="commontitle"> 详细描述： </view>
        <view class="desdetails">
          {{ content }}
        </view>
      </view>
      <view class="commonbox">
        <view class="commontitle"> 性别： </view>
        <view class="commontext">{{ gender }}</view>
      </view>
      <view class="commonbox">
        <view class="commontitle"> 人数： </view>
        <view class="commontext">{{ num + "人" }}</view>
      </view>
      <view class="commonbox">
        <view class="commontitle"> 开始时间：</view>
        <view class="commontext">{{ goTime }}</view>
      </view>
      <view class="commonbox">
        <view class="commontitle">标签：</view>
        <view class="tags">
          <u-tag
            :text="category"
            type="info"
            shape="circle"
            plain
            borderColor="#EFEFEF"
          ></u-tag>
        </view>
      </view>
      <view class="commonbox">
        <view class="commontitle">已组队人数：</view>
        <view class="commontext">{{ nowNum + "人" }}</view>
      </view>
    </view>
    <view class="pal">
      <u-button
        text="Pal一下"
        color="linear-gradient(to bottom, #29A7FE, #62DFE5)"
        shape="circle"
        @click="pageJump('/pages/message/chatroom/chatroom', this.postId)"
      ></u-button>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";

export default {
  data() {
    return {
      category: "",
      content:
        "内易会济现期然维史二条建真。非东支究行江约半话与及由就北入。有族证华律们按门却国派开标。点提步放往且据方有数育放直王府写设指。其南少各和空矿题想场持代线行易提只。",
      goTime: "2023-04-19 13:02:41",
      num: 9,
      nowNum: 3,
      title: "啊实打实",
      watchNum: 1,
      gender: "男",
      author: {
        name: "猫",
        school: "天津理工大学",
        year: 20,
        gender: "男",
      },
      postId: "",
      // category: "运动",
      // gender: "性别不限",
      // count: 20,
      // paltime: "2023-01-05 12:00",
      // currentcount: 6,
      // title: "去南京看薛之谦演唱会",
      // school: "天津理工大学",
      // age: 20,
      // sex: "男",
      // name: "肥肥鲨",
      // school: "天津理工大学",
      avatorurl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
    };
  },
  onLoad(options) {
    // console.log(options);
    this.postId = options.postId;
    this.getDetails();
    // console.log("openid", uni.getStorageSync("openid"));
  },
  methods: {
    pageJump(url, postId) {
      console.log(String(postId));
      if (postId) {
        url = url + "?postId=" + postId;
      }
      uni.navigateTo({
        url: url,
      });
    },
    async getDetails() {
      let data = {
        postId: this.postId,
      };
      const { data: res } = await request(
        "/controller/topic/detail",
        "GET",
        data
      );
      this.author = res.author;
      this.category = res.category;
      this.content = res.content;
      this.gender = res.gender;
      this.goTime = res.goTime;
      this.nowNum = res.nowNum;
      this.num = res.num;
      this.title = res.title;
      console.log(res);
      console.log(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.pal {
  margin-left: 10vw;
  width: 80vw;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.commontext {
  font-size: 14px;
}
.desdetails {
  margin-top: 1vh;
  text-indent: 2em;
  font-size: 14px;
}
.commontitle {
  font-weight: bold;
}
.detailbox {
  margin-top: 3vh;
  margin-left: 8vw;
  margin-right: 4vw;
}
.title {
  font-weight: bold;
  font-size: 19px;
  margin-top: 3vh;
  margin-left: 8vw;
}
.commonbox {
  display: flex;
  margin-top: 3vh;
  margin-left: 8vw;
  margin-right: 4vw;
}
.header {
  display: flex;
  justify-content: space-around;
}
.concern {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 6vh;
}
.header {
  margin-top: 2vh;
}
.info {
  display: flex;
}
.introduce {
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  .name {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 0.5vh;
  }
  .others {
    display: flex;
    font-size: 10px;
    color: #9a9a9a;
  }
}
// .avator {
//   // margin-left: 8vw;
// }
.line {
  color: #9a9a9a;
  float: left;
  width: 0.1em;
  height: 1.2em;
  margin-right: 0.5em;
  margin-left: 0.5em;
  background: #9a9a9a;
}
</style>
