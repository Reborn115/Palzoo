<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <u-popup
      :show="show"
      @close="popClose"
      overlay="true"
      mode="bottom"
      closeable="true"
      closeOnClickOverlay="true"
      :round="15"
    >
      <view class="popup"> </view>
    </u-popup>
    <u-popup
      :show="showConfirm"
      @close="confirmClose"
      overlay="true"
      mode="bottom"
      closeable="true"
      closeOnClickOverlay="true"
      :round="15"
    >
      <view class="popup">
        <view class="popText">入场押金</view>
        <view class="popBotton">
          <u-button
            size="normal"
            type="success"
            text="确认"
            @click="confirmClose"
          ></u-button>
        </view>
      </view>
    </u-popup>
    <view class="placeOrder">
      <view class="sum">
        <view class="prompt"
          ><u-icon name="question-circle" @click="popShow"></u-icon
        ></view>
        <view class="text">共计： 100元</view>
      </view>
      <view class="botton">
        <u-button
          size="normal"
          type="success"
          text="立即预订"
          @click="confirmShow"
        ></u-button>
      </view>
    </view>
    <view class="container">
      <view class="bgimg">
        <u--image
          :showLoading="true"
          :src="bgImg"
          width="100vw"
          height="26vh"
          mode="widthFix"
        ></u--image>
      </view>
      <view class="content">
        <view class="main">
          <view class="datePiker">
            <view class="title"> 预订日期 </view>
            <uni-datetime-picker
              type="date"
              returnType="timestamp"
              :clear-icon="false"
              v-model="date"
              @change="changeDate"
            />
          </view>
          <view class="timePicker">
            <view class="title">预订时间段</view>
            <view class="timeBotton">
              <u-button
                type="success"
                :plain="timeState.morning ? false : true"
                text="上午场 09:00-15:00"
                size="small"
                @click="clickTime(1)"
              ></u-button>
              <u-button
                type="success"
                :plain="timeState.noon ? false : true"
                text="下午场 15:30-21:30"
                size="small"
                @click="clickTime(2)"
              ></u-button>
            </view>
          </view>
          <view class="chooseSite">
            <view class="title">选择座位</view>
            <view class="details">
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
              <view class="description">
                <view class="type"> 这些年房车烧烤营地</view>
                <view class="brief"
                  >{{ "——（" + "适合6-10人，配备空调卫生间" + "）" }}
                </view>
                <view class="gap">简介</view>
                <view class="more"
                  >场地包含：VIP房车（内含独立卫生间、四人卡座、空调、日式榻榻米）、小院内含桌椅水池上下水等等</view
                >
                <view class="gap">留影</view>
                <view class="images">
                  <u-album
                    :urls="urls"
                    maxCount="999"
                    rowCount="2"
                    multipleSize="36vw"
                    singleSize="73vw"
                  ></u-album>
                </view>
                <view class="gap">开场送</view>
                <view class="send"> 营地露营开场就送：入营烧烤福袋 </view>
                <view class="gap">场地选择</view>
                <view class="choosePosition">
                  <view>请根据平面图预订场地，场地选定后，不支持现场更改</view>

                  <view class="positionBotton">
                    <u-button
                      v-for="(item, index) in roomStatusList"
                      :key="index"
                      :type="item.isPresent ? 'success' : 'error'"
                      :disabled="item.isPresent ? false : true"
                      :plain="item.locationState ? false : true"
                      :text="item.location"
                      size="small"
                      @click="clickLocation(index)"
                    ></u-button>
                    <!-- <u-button
                      type="success"
                      :plain="timeState.noon ? false : true"
                      text="中 13:00-17:00"
                      size="small"
                      @click="clickTime(2)"
                    ></u-button>
                    <u-button
                      type="success"
                      :plain="timeState.night ? false : true"
                      text="晚 17:00-21:00"
                      size="small"
                      @click="clickTime(3)"
                    ></u-button> -->
                  </view>
                  <view class="illustrate">
                    <view class="illustrateTips">
                      <u-button
                        type="success"
                        :plain="false"
                        text="当前已选"
                        size="small"
                      ></u-button>
                    </view>
                    <view class="illustrateTips">
                      <u-button
                        type="success"
                        :plain="true"
                        text="当前空闲"
                        size="small"
                      ></u-button>
                    </view>
                    <view class="illustrateTips">
                      <u-button
                        type="error"
                        :plain="true"
                        text="已有顾客"
                        size="small"
                      ></u-button>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      isDate: false,
      urls: [],
      tabslist: [],
      showConfirm: false,
      show: false,
      date: "",
      startTime: "",
      endTime: "",
      typeId: 1,
      roomInfoList: [],
      roomStatusList: [],
      currentTabIndex: 0,
      bgImg: "https://s2.loli.net/2023/04/12/EbPUytJdOrRB86g.png",
      date: "",
      isActive: true,
      timeState: {
        morning: false,
        noon: false,
      },
    };
  },
  onLoad() {
    this.getRoomList();
    // this.getRoomStatus(1);
  },
  methods: {
    clickLocation(index) {
      this.roomStatusList[index].locationState =
        !this.roomStatusList[index].locationState;
    },
    confirmClose() {
      this.showConfirm = false;
    },
    confirmShow() {
      this.showConfirm = true;
    },
    popClose() {
      this.show = false;
    },
    popShow() {
      this.show = true;
    },
    async getRoomList() {
      const { data: res } = await request("/list/type", "GET");
      console.log(res);
      this.tabslist = res.typeNameList;
    },
    async getRoomStatus() {
      let data = {
        typeId: this.typeId,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      const { data: res } = await request("/list/rooms", "GET", data);
      // console.log(res);
      // console.log(this);
      this.roomStatusList = res.roomLocalList;
      console.log(this.roomStatusList);
    },
    changeTab(index) {
      // console.log("这是index", index);

      // console.log("这是index.typeId", index.id);
      this.typeId = index.id;
      // console.log("这是typeId", this.typeId);
      if (this.currentTabIndex != index.id) {
        this.currentTabIndex = index.id - 1;
        // console.log(this.currentTabIndex);
      }
    },
    clickTime(order) {
      if (this.isDate) {
        if (order == 1) {
          this.timeState.morning = !this.timeState.morning;
          this.startTime = this.date + 32400000;
          this.endTime = this.date + 46800000;
          // console.log(this.startTime);
          // console.log(this.endTime);
        }
        if (order == 2) {
          this.timeState.noon = !this.timeState.noon;
          this.startTime = this.date + 46800000;
          this.endTime = this.date + 61200000;
        }
        if (order == 3) {
          this.timeState.night = !this.timeState.night;
          this.startTime = this.date + 61200000;
          this.endTime = this.date + 75600000;
        }
        this.getRoomStatus();
      } else {
        this.showToast({
          type: "error",
          message: "请先选择日期",
        });
      }
    },
    changeDate(e) {
      this.isDate = true;
      this.date = e;
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,
        complete() {
          params.url &&
            uni.switchTab({
              url: params.url,
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.illustrate {
  margin-top: 2vh;
  display: flex;
  justify-content: space-around;
}
.popup {
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .popText {
    width: 90vw;
  }
  .popBotton {
    ::v-deep .u-button {
      width: 90vw;
    }
  }
}
.choosePosition {
  width: 80vw;
  .positionBotton {
    padding-top: 2vh;
    // height: 16vh;
    width: 80vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    // justify-content: space-around;
    ::v-deep .u-button {
      width: 60vw;
      margin-bottom: 1vh;
    }
  }
}
.description {
  margin-top: 2vh;
}
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
.placeOrder {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .sum {
    display: flex;
    width: 30vw;
    justify-content: space-around;

    .text {
      font-size: 13px;
    }
  }

  .botton {
    width: 30vw;
  }
}
.placeOrder {
  background-color: white;
  z-index: 1;
  position: fixed;
  top: 91vh;
  height: 9vh;
  width: 100vw;
}
.chooseSite {
  padding-top: 3vh;
  width: 80vw;
}
.timePicker {
  padding-top: 3vh;
  width: 80vw;
  .timeBotton {
    height: 16vh;
    width: 80vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    ::v-deep .u-button {
      width: 60vw;
    }
  }
}
.title {
  font-weight: bold;
  margin-bottom: 2vh;
}
.datePiker {
  padding-top: 3vh;
  width: 80vw;
}
.content {
  padding-bottom: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // margin-left: 5vw;
  width: 100vw;
  position: relative;
  top: -10vh;
  //   background-color: white;
  .main {
    padding-bottom: 3vh;
    background-color: white;
    width: 90vw;
    // height: 28vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
  }
}
</style>
