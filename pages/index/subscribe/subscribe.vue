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
                :plain="timeState[0] ? false : true"
                text="上午场 09:00-15:00"
                size="small"
                @click="clickTime(0, 1)"
              ></u-button>
              <u-button
                type="success"
                :plain="timeState[1] ? false : true"
                text="下午场 15:30-21:30"
                size="small"
                @click="clickTime(1, 0)"
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
                <view class="type"> {{ activeInfo.type }}</view>
                <view class="brief"
                  >{{ "——（" + activeInfo.brief + "）" }}
                </view>
                <view class="gap">简介</view>
                <view class="more">{{ activeInfo.more }}</view>
                <view class="gap">留影</view>
                <view class="images">
                  <u-album
                    :urls="activeInfo.images"
                    maxCount="999"
                    rowCount="2"
                    multipleSize="36vw"
                    singleSize="73vw"
                  ></u-album>
                </view>
                <!-- <view class="gap">开场送</view>
                <view class="send">
                  {{ activeInfo.send }}
                </view> -->
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
                      @click="clickLocation(item, index)"
                    ></u-button>
                    <!-- <u-button
                      type="success"
                      :plain="timeState[1] ? false : true"
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
      isLocation: false,
      price: "",
      roomId: "",
      activeInfo: {},
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
      bgImg:
        "http://rtk2m6fyw.hb-bkt.clouddn.com/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E9%A6%96%E9%A1%B5%E5%9B%BE.png",
      date: "",
      isActive: true,
      timeState: [false, false],
    };
  },
  onLoad() {
    this.getRoomList();
    this.getRoomInfo();
    // this.getRoomStatus(1);
  },
  methods: {
    async generateOrder() {
      let data = {
        openid: uni.getStorageSync("openid"),
        roomId: this.roomId,
        price: this.price,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      const res = await request("/order/room", "POST", data);
      if (res.code == "00000") {
        this.showToast({
          type: "success",
          message: res.message,
          url: "/pages/myOrder/placeOrder/placeOrder",
        });
      }
      console.log("res", res);
    },
    async getRoomInfo() {
      const { data: res } = await request("/show/rooms", "GET");
      console.log(res);
      this.roomInfoList = res.roomInfoList;
      this.activeInfo = this.roomInfoList[0];
    },
    clickLocation(item, index) {
      console.log(item);
      console.log(this.isLocation, this.roomStatusList[index].locationState);
      if (!this.isLocation && !this.roomStatusList[index].locationState) {
        this.roomStatusList[index].locationState = true;
        this.isLocation = true;
        this.roomId = item.roomId;
      } else {
        if (this.isLocation && this.roomStatusList[index].locationState) {
          this.roomStatusList[index].locationState = false;
          this.isLocation = false;
          this.roomId = null;
        } else {
          if (this.isLocation && !this.roomStatusList[index].locationState) {
            this.showToast({
              type: "error",
              message: "只能选择一个场地",
            });
          }
        }
      }
      console.log(this.activeInfo);
      this.price = this.activeInfo.price;
      console.log(this.price);
    },
    confirmClose() {
      this.showConfirm = false;
      this.generateOrder();
    },
    confirmShow() {
      if (!this.date) {
        this.showToast({
          type: "error",
          message: "请先选择日期",
        });
      } else {
        if (!this.endTime || !this.startTime) {
          this.showToast({
            type: "error",
            message: "请先选择预约时间段",
          });
        } else {
          this.showConfirm = true;
        }
      }
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
      // console.log(this.timeState[0], this.timeState[1]);
      if (!this.timeState[0] && !this.timeState[1]) {
        this.roomStatusList = [];
      }
    },
    changeTab(index) {
      this.timeState[0] = false;
      this.timeState[1] = false;
      this.startTime = "";
      this.endTime = "";
      this.date = null;
      this.isLocation = false;
      this.getRoomStatus();
      // this.getRoomInfo();
      this.typeId = index.id;
      this.activeInfo = this.roomInfoList[index.id - 1];
      // console.log("这是typeId", this.typeId);
      if (this.currentTabIndex != index.id) {
        this.currentTabIndex = index.id - 1;
        // console.log(this.currentTabIndex);
      }
    },
    clickTime(click, another) {
      if (this.isDate) {
        if (this.timeState[0] && this.timeState[1]) {
          this.timeState[click] = false;
          if (click == 0) {
            this.startTime = this.date + 55800000;
            this.getRoomStatus();
          } else {
            this.endTime = this.date + 54000000;
            this.getRoomStatus();
          }
        } else {
          if (!this.timeState[0] && !this.timeState[1]) {
            this.timeState[click] = true;
            if (click == 0) {
              this.startTime = this.date + 32400000;
              this.endTime = this.date + 54000000;
              this.getRoomStatus();
            } else {
              this.startTime = this.date + 55800000;
              this.endTime = this.date + 77400000;
              this.getRoomStatus();
            }
          } else {
            if (this.timeState[0] && !this.timeState[1]) {
              if (click == 0) {
                this.startTime = "";
                this.endTime = "";
                this.timeState[0] = false;
                this.getRoomStatus();
              } else {
                this.startTime = this.date + 32400000;
                this.endTime = this.date + 77400000;
                this.timeState[1] = true;
                this.getRoomStatus();
              }
            }
            if (!this.timeState[0] && this.timeState[1]) {
              if (click == 0) {
                this.startTime = this.date + 32400000;
                this.endTime = this.date + 77400000;
                this.timeState[0] = true;
                this.getRoomStatus();
              } else {
                this.startTime = "";
                this.endTime = "";
                this.timeState[1] = false;
                this.getRoomStatus();
              }
            }
          }
        }
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
            uni.navigateTo({
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
  top: -5vh;
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
