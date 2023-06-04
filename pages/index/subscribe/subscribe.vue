<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <u-popup
      :show="show"
      @close="popClose"
      :overlay="true"
      mode="bottom"
      :closeable="true"
      :closeOnClickOverlay="true"
      :round="15"
    >
      <view class="popup"> </view>
    </u-popup>
    <u-popup
      :show="showConfirm"
      @close="cancerConfirm"
      :overlay="true"
      mode="bottom"
      :closeable="true"
      :closeOnClickOverlay="true"
      :round="15"
    >
      <view class="popup">
        <view class="popTitle" style="font-weight: bold">入场押金说明</view>
        <view class="popText">
          1.入场顾客需缴纳场地押金，每场押金费用：100元（集装箱
          200元），押金在您确认退场时，由工作人员检查完毕后，按照原支付路径退回。
        </view>
        <view class="popText">
          2.顾客入场后仅可使用本营位设备（桌椅、上下水、烧烤炉等），不可占用其他营位设施或物品。若有违反，工作人员将进行劝告，情节严重者，场地押金将不予退回。
        </view>
        <view class="popText">
          3.营位使用每场时间为6个小时，超时0-30分钟，押金不予退回；超时30分钟及以上，需补交续场费用。
        </view>
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
          ><u-icon name="question-circle" @click="goRule"></u-icon
        ></view>
        <view class="text">{{ "共计：" + this.price }}</view>
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
              :start="dateMin"
            />
          </view>
          <view class="timePicker">
            <view class="title">预订时间段</view>
            <u-skeleton rows="4" :loading="loading" :title="false">
              <view class="timeBotton">
                <u-button
                  type="success"
                  :plain="timeState[0] ? false : true"
                  text="上午场 09:00-15:00"
                  size="small"
                  @click="clickTime(0, 1)"
                  :disabled="this.date + 54000000 < this.timestamp"
                ></u-button>
                <u-button
                  type="success"
                  :plain="timeState[1] ? false : true"
                  text="下午场 15:30-21:30"
                  size="small"
                  @click="clickTime(1, 0)"
                ></u-button>
              </view>
            </u-skeleton>
          </view>
          <view class="chooseSite">
            <view class="title">选择座位</view>
            <view class="details">
              <view class="tab">
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

              <view class="description">
                <u-skeleton rows="2" :loading="loading" :title="false">
                  <view class="type"> {{ activeInfo.type }}</view>
                  <view class="brief"
                    >{{ "——（" + activeInfo.brief + "）" }}
                  </view>
                </u-skeleton>

                <view class="gap">简介</view>
                <u-skeleton rows="1" :loading="loading" :title="false">
                  <view class="more">{{ activeInfo.more }}</view>
                </u-skeleton>

                <view class="gap">留影</view>
                <view class="images">
                  <u-album
                    :urls="activeInfo.images"
                    maxCount="2"
                    rowCount="2"
                    multipleSize="36vw"
                  ></u-album>
                </view>
                <!-- <view class="gap">开场送</view>
                <view class="send">
                  {{ activeInfo.send }}
                </view> -->
                <view class="gap">场地选择</view>
                <view class="choosePosition">
                  <u-album
                    :urls="priceList"
                    maxCount="1"
                    rowCount="1"
                    singleSize="80vw"
                  ></u-album>
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
// import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      dateMin: "",
      timestamp: "",
      loading: true,
      activeTab: "",
      albumWidth: 0,
      priceList: [
        "https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD3.jpeg",
      ],
      paydata: {
        appId: "wx59b1fc4a64d36349",
        nonceStr: "GfDluA26xezu7ErSujjetJDIcEubOWdP",
        packageVal: "prepay_id=wx2221511114082384b9718f3318e7990000",
        signType: "RSA",
        paySign:
          "hJj6myECdyXJ11cQpMpqyFEgcceOJ839gbBRN7tlFWoZkaw8jEnfxdBBImWpBHWFp/PRmZJ7P7pHIzmYzOAhn37NeQPSkAN0pG3hVZMIkQ1rVQ+8PB8VYDaIvN5CIWNGG7reJsNbo9j2iAj7eIaI4tmPkDpZuUP23GIQmxH68uPenDzxIUAN6PDS3t8Y+vj2g9xkpNVFv3JPadkH8csfrIVip4+Ex4V3q1gh+35/eHGcPScrSKO3y2OU6EYKT2K5dSHWDfxaFldvmi2Os+txWBUIfJLFDTawN5AWHRBP37rU8RQtLhE+ii0XGiUn4GM6tEvJPujOVmnDZawL/SnlUA==",
        timeStamp: "1684763471",
      },
      activeLocation: "",
      isLocation: false,
      price: 0,
      roomId: "",
      activeInfo: {
        images: [""],
      },
      isDate: true,
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
        "https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E9%A6%96%E9%A1%B5%E5%9B%BE.png",
      date: "",
      isActive: true,
      timeState: [false, false],
    };
  },
  // async onLoad() {
  //   this.getRoomList();
  //   await this.getRoomInfo();
  //   this.getRoomStatus();
  //   this.date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  // },
  async onShow() {
    this.getRoomList();
    await this.getRoomInfo();
    this.getRoomStatus();
    this.dateMin = this.dateFormat("YYYY-mm-dd HH:MM", new Date());
    console.log(this.dateMin);
    this.timeState[0] = false;
    this.timeState[1] = false;
    this.startTime = "";
    this.endTime = "";
    this.timestamp = new Date().getTime();
    this.date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    this.isLocation = false;
    this.currentTabIndex = 0;
  },
  methods: {
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    async searchOrder() {
      let data = {
        openid: uni.getStorageSync("openid"),
        roomId: this.roomId,
        price: this.price,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      const res = await request("/query/order", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.showToastSwitchTab({
          type: "success",
          message: res.message,
          url: "/pages/myOrder/myOrder",
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
    async cancelOrder() {
      let data = {
        openid: uni.getStorageSync("openid"),
        roomId: this.roomId,
        price: this.price,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      const res = await request("/close/order", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.getRoomList();
        await this.getRoomInfo();
        this.getRoomStatus();
        this.dateMin = this.dateFormat("YYYY-mm-dd HH:MM", new Date());
        console.log(this.dateMin);
        this.timeState[0] = false;
        this.timeState[1] = false;
        this.startTime = "";
        this.endTime = "";
        this.timestamp = new Date().getTime();
        this.date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        this.isLocation = false;
        this.currentTabIndex = 0;
        this.showToast({
          type: "success",
          message: res.message,
          // url: "/pages/index/subscribe/subscribe",
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
    goRule() {
      uni.navigateTo({
        url: "/pages/mine/appointmentInstructions/appointmentInstructions",
      });
    },
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
        let a = new Promise((resolve, reject) => {
          let result = wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.packageVal,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: function (res) {
              console.log("success", res);
              resolve(res);
            },
            fail: function (res) {
              console.log("fail", res);
              resolve(res);
            },
            complete: function (res) {
              console.log("complete", res);
              resolve(res);
            },
          });
        }).then((val) => {
          if (val.errMsg == "requestPayment:fail cancel") {
            this.cancelOrder();
          }
          if (val.errMsg == "requestPayment:ok") {
            this.searchOrder();
          }
          console.log("val", val.errMsg);
        });
      } else {
        this.getRoomStatus();
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
      // console.log("res", res);
    },
    async getRoomInfo() {
      const { data: res } = await request("/show/rooms", "GET");
      // console.log(res);
      this.roomInfoList = res.roomInfoList;
      this.activeInfo = this.roomInfoList[0];
      uni.$u.sleep(1000).then(() => {
        this.loading = false;
      });
    },
    clickLocation(item, index) {
      // console.log(item);
      // console.log(this.isLocation, this.roomStatusList[index].locationState);
      if (!this.isLocation && !this.roomStatusList[index].locationState) {
        this.roomStatusList[index].locationState = true;
        this.isLocation = true;
        this.roomId = item.roomId;
        this.activeLocation = index;
      } else {
        if (this.isLocation && this.roomStatusList[index].locationState) {
          this.roomStatusList[index].locationState = false;
          this.isLocation = false;
          this.roomId = null;
          this.activeLocation = "";
        } else {
          if (this.isLocation && !this.roomStatusList[index].locationState) {
            this.roomStatusList[this.activeLocation].locationState = false;
            this.roomStatusList[index].locationState = true;
            this.isLocation = true;
            this.roomId = item.roomId;
            this.activeLocation = index;
            // this.showToast({
            //   type: "error",
            //   message: "只能选择一个场地",
            // });
          }
        }
      }
      // console.log(this.activeInfo);
      if (this.timeState[0] && this.timeState[1]) {
        this.price = this.activeInfo.price * 2;
      } else {
        if (!this.timeState[0] && !this.timeState[1]) {
          this.price = 0;
        } else {
          this.price = this.activeInfo.price;
        }
      }

      // console.log(this.price);
    },
    cancerConfirm() {
      this.showConfirm = false;
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
      // console.log(res);
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
      if (this.activeInfo) {
        this.check2();
      }
      // console.log(this.roomStatusList);
      // console.log(this.timeState[0], this.timeState[1]);
      if (!this.timeState[0] && !this.timeState[1]) {
        this.roomStatusList = [];
        if (this.activeInfo) {
          this.check2();
        }
      }
    },
    check2() {
      if (this.activeInfo) {
        if (this.typeId != this.activeInfo.id) {
          // console.log("乱了");
          console.log("activeInfo", this.activeInfo);
          this.typeId = this.activeInfo.id;
          this.getRoomStatus();
        } else {
          // console.log("没乱");
        }
      }
    },
    check1(index) {
      // console.log("index", index);
      // console.log("activeInfo", this.activeInfo);
      if (this.activeInfo) {
        if (index.name != this.activeInfo.type) {
          // console.log("乱了");
          this.activeInfo = this.roomInfoList[index.id - 1];
        } else {
          // console.log("没乱");
        }
        // if (this.typeId != this.activeInfo.id) {
        //   // console.log("乱了");
        //   this.typeId = this.activeInfo.id;
        //   this.getRoomStatus();
        // } else {
        //   // console.log("没乱");
        // }
      }
    },
    changeTab(index) {
      this.price = 0;
      this.isLocation = false;
      this.activeLocation = "";
      this.typeId = index.id;
      this.getRoomStatus();
      this.activeInfo = this.roomInfoList[index.id - 1];
      console.log("这是typeId", this.typeId);
      if (this.currentTabIndex != index.id) {
        this.currentTabIndex = index.id - 1;
      }
      this.check1(index);
    },
    clickTime(click, another) {
      if (this.isDate) {
        if (this.timeState[0] && this.timeState[1]) {
          this.timeState[click] = false;
          if (click == 0) {
            this.startTime = this.date + 55800000;
            this.getRoomStatus();
            this.price = 0;
          } else {
            this.endTime = this.date + 54000000;
            this.getRoomStatus();
            this.price = 0;
          }
        } else {
          if (!this.timeState[0] && !this.timeState[1]) {
            this.timeState[click] = true;
            if (click == 0) {
              this.startTime = this.date + 32400000;
              this.endTime = this.date + 54000000;
              this.getRoomStatus();
              this.price = 0;
            } else {
              this.startTime = this.date + 55800000;
              this.endTime = this.date + 77400000;
              this.getRoomStatus();
              this.price = 0;
            }
          } else {
            if (this.timeState[0] && !this.timeState[1]) {
              if (click == 0) {
                this.startTime = "";
                this.endTime = "";
                this.timeState[0] = false;
                this.getRoomStatus();
                this.price = 0;
              } else {
                this.startTime = this.date + 32400000;
                this.endTime = this.date + 77400000;
                this.timeState[1] = true;
                this.getRoomStatus();
                this.price = 0;
              }
            }
            if (!this.timeState[0] && this.timeState[1]) {
              if (click == 0) {
                this.startTime = this.date + 32400000;
                this.endTime = this.date + 77400000;
                this.timeState[0] = true;
                this.getRoomStatus();
                this.price = 0;
              } else {
                this.startTime = "";
                this.endTime = "";
                this.timeState[1] = false;
                this.getRoomStatus();
                this.price = 0;
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
    showToastSwitchTab(params) {
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
.tab {
  width: 100%;
}
.details {
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
}
.illustrate {
  margin-top: 2vh;
  display: flex;
  justify-content: space-around;
}
.popup {
  height: 53vh;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  .popText {
    width: 90vw;
    font-size: 15px;
  }
  .popTitle {
    margin-bottom: 5vh;
    margin-top: 3vh;
    width: 90vw;
  }
  .popBotton {
    margin-top: 5vh;
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
