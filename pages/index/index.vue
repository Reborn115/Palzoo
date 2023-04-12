<template>
  <view class="content">
    <view class="add">
      <u--image
        :lazy-load="true"
        :showLoading="true"
        width="55px"
        height="55px"
        src="https://s2.loli.net/2023/04/05/TNSu8oipV5LJqAr.png"
        shape="circle"
        @click="pageJump('/pages/index/publish/publish')"
      ></u--image>
    </view>
    <view class="tabs">
      <u-sticky bgColor="linear-gradient(to right, #12D8FA, #a5fecb)">
        <u-tabs
          @change="change"
          :current="currentTabIndex"
          :list="tabslist"
          lineColor="white"
          :activeStyle="{
            color: 'white',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
          }"
          :inactiveStyle="{
            color: 'white',
            transform: 'scale(1)',
          }"
          itemStyle="height: 34px;"
        >
          <template #right>
            <!-- <div class="line" /> -->
          </template>
        </u-tabs>
      </u-sticky>
    </view>
    <view class="list">
      <uni-datetime-picker
        v-model="datetimerange"
        type="datetimerange"
        rangeSeparator="至"
        @change="timeChange()"
      />
      <view v-if="currentTabIndex == 0">
        <uni-card
          :is-shadow="false"
          class="container"
          v-for="(item, index) in tips"
          :key="index"
        >
          <view
            class="info"
            @click="pageJump('/pages/index/paldetails/paldetails', item.postId)"
          >
            <view class="title">
              <h3>{{ item.title }}</h3>
            </view>
            <view>
              <text class="sex">{{ item.gender }}</text>
              <text>{{ "人数：" + item.number }}</text>
            </view>
            <view>
              <text>开始时间：{{ item.goTime }}</text>
            </view>
            <view class="tags">
              <u-tag
                :text="item.category"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag>
              <!-- <u-tag
                :text="item.categoryNext"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag> -->
              <!-- <u-tag
                text="标签"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag> -->
            </view>
          </view>
          <view class="pickbotton">
            <u-button
              text="Pal一下"
              color="linear-gradient(to bottom, #29A7FE, #62DFE5)"
              shape="circle"
              @click="pageJump('/pages/message/chatroom/chatroom', item.postId)"
            ></u-button>
          </view>
        </uni-card>
      </view>
      <view v-if="currentTabIndex == 1"> </view>
      <view v-if="currentTabIndex == 2"> </view>
      <view v-if="currentTabIndex == 3"> </view>
      <view v-if="currentTabIndex == 4"> </view>
      <view v-if="currentTabIndex == 5"> </view>
      <view v-if="currentTabIndex == 6"> </view>
    </view>
    <view class="loading"
      ><u-loadmore
        :status="status"
        loadingText="努力加载中,先喝杯茶"
        color="#909399"
      ></u-loadmore
    ></view>
  </view>
</template>

<script>
import request from "@/request/request.js";
import uText from "../../uni_modules/uview-plus/components/u--text/u--text.vue";
export default {
  components: { uText },
  data() {
    return {
      searchForm: {
        lastTime: null,
        startTime: null,
        endTime: null,
        category: null,
        categoryNext: null,
        gender: null,
        number: null,
      },

      status: "loadmore",
      datetimerange: null,
      currentTabIndex: 0,
      tips: [],
      tabslist: [
        {
          name: "全部",
        },
        {
          name: "运动",
        },
        {
          name: "美食",
        },
        {
          name: "出行",
        },
        {
          name: "学习",
        },
        {
          name: "其他",
        },
      ],
    };
  },
  onReachBottom() {
    this.status = "loading";
    console.log("到底了");
    this.getTopic();
  },
  onLoad() {
    this.searchForm.category = null;
    this.searchForm.lastTime = null;
    console.log("openid", uni.getStorageSync("openid"));
    this.getTopic();
  },
  methods: {
    async getTopic() {
      let data = {
        lastTime: this.searchForm.lastTime,
        startTime: this.searchForm.startTime,
        endTime: this.searchForm.endTime,
        screen: {
          category: this.searchForm.category,
          numberMin: null,
          gender: null,
          numberMax: null,
        },
      };
      const { data: res } = await request(
        "/controller/topic/search",
        "POST",
        data
      );
      if (!this.searchForm.lastTime) {
        this.tips = res.waterfalls;
        this.searchForm.lastTime = res.nextTime;
      } else {
        this.tips.push(...res.waterfalls);
        this.status = "loadmore";
      }

      console.log(res.waterfalls);
      console.log(this.searchForm.lastTime);
    },
    pageJump(url, postId) {
      console.log(String(postId));
      if (postId) {
        url = url + "?postId=" + postId;
      }
      uni.navigateTo({
        url: url,
      });
    },
    timeChange() {
      this.searchForm.startTime = this.datetimerange[0];
      this.searchForm.endTime = this.datetimerange[1];
      this.getTopic();
    },
    change(index) {
      if (index.name == "全部") {
        this.searchForm.category = null;
        this.searchForm.lastTime = null;
      } else {
        this.searchForm.category = index.name;
        this.searchForm.lastTime = null;
      }

      // console.log("这是index", index);
      // console.log("这是category", this.searchForm.category);
      // if (this.currentTabIndex != index.index) {
      //   this.currentTabIndex = index.index;
      //   // console.log(this.currentTabIndex);
      // }
      this.getTopic();
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 4vh;
  margin-bottom: 4vh;
}
.add {
  box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  height: 55px;
  width: 55px;
  background-color: white;
  z-index: 100;
  position: fixed;
  top: 30px;
  right: 5px;
  top: 88vh;
  left: 80vw;
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
  width: 25vw !important;
  height: 5vh !important;
}
.container {
  display: flex;
}
::v-deep .u-tag {
  margin-right: 3vw !important;
  // width: 10vw !important;
  // align-items: center !important;
  // box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2) !important;
}
.sex {
  margin-right: 3vw;
}
.tags {
  display: flex;
}
.info {
  width: 50vw;
  height: 18vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 13px;
  color: #9a9a9a;
}
.title {
  font-size: 17px;
  font-weight: bold;
  color: black;
}
::v-deep .uni-card {
  // display: flex;
  // flex-direction: row !important;
  margin: 0 !important;
  margin-top: 2vh !important;
  // padding: 0 !important;
  border-radius: 10px;
  height: 21vh;
  width: 83.5vw;
  box-shadow: 5px 5px 8px #bebebe !important;
}
.list {
  width: 90vw;
  margin-top: 2vh;
}
.tabs {
  width: 100vw;
  background-image: linear-gradient(to bottom, #3bcaf2, #95f5d0) !important;
  padding-left: 4vw;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: row;
}
/* 竖线 */
.line {
  float: left;
  width: 0.1em;
  height: 1.5em;
  margin-right: 1em;
  margin-left: 1em;
  background: #f3f3f3;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
