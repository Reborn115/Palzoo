<template>
  <view class="container">
    <view class="tab">
      <u-tabs
        :scrollable="true"
        @change="changeTab"
        :current="currentTabIndex"
        :list="tabslist"
        lineColor="#8dc26f"
        lineWidth="50"
        :activeStyle="{
          color: '#8dc26f',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#9A9A9A',
          transform: 'scale(1)',
        }"
        itemStyle="height: 34px;padding-left: 20vw; padding-right: 20vw;"
      >
      </u-tabs>
    </view>
    <view class="select" v-if="!this.currentTabIndex">
      <view class="text"> 请选择要查询的时间段 ：</view>
      <uni-data-select
        v-model="type"
        :localdata="selectList"
        @change="change"
        :clear="false"
      ></uni-data-select>
    </view>
    <view class="empty">
      <u-empty
        mode="order"
        icon="http://cdn.uviewui.com/uview/empty/order.png"
        v-if="!this.orderInfoList.length"
      >
      </u-empty>
    </view>
    <view class="cardbox">
      <view class="card" v-for="(item, index) in orderInfoList" :key="index">
        <view class="line1">
          <view class="ticketNumber">
            {{ "交易单号：" + item.payNo }}
          </view>
          <view class="payStatus">
            {{ item.isPay == 1 ? "已支付" : "已申请退款" }}
          </view>
        </view>
        <view class="line2">
          <view class="date">
            <view class="title"> 预定日期 </view>
            <view class="context">
              {{ item.playDate }}
            </view>
          </view>
          <view class="time">
            <view class="title"> 预订时间段 </view>
            <view class="context">
              <u-button
                type="success"
                :plain="true"
                :text="item.startTime + ' - ' + item.endTime"
                size="small"
              ></u-button>
            </view>
          </view>
          <view class="seat">
            <view class="title">座位</view>
            <view class="context">
              {{ item.roomType + "  " + item.location }}
            </view>
          </view>
          <view class="price">
            <view class="title">价格</view>
            <view class="context">
              {{ "￥" + item.price }}
            </view>
          </view>
        </view>
        <view class="line3">
          <view class="blank">
            {{ "订单创建时间：" }}<br />
            {{ item.createTime }}
          </view>
        </view>
      </view>
    </view>
    <view class="loading" v-if="this.currentTabIndex"
      ><u-loadmore
        :status="status"
        loadingText="努力加载中,先喝杯茶"
        color="#909399"
      ></u-loadmore
    ></view>
  </view>
</template>

<script>
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      status: "loadmore",
      orderInfoList: [],
      type: 1,
      pageNum: 1,
      currentTabIndex: 0,
      tabslist: [
        { id: 0, name: "今天" },
        { id: 1, name: "全部" },
      ],
      selectList: [
        { value: 1, text: "当前" },
        { value: 2, text: "上午" },
        { value: 3, text: "下午" },
        { value: 4, text: "整天" },
      ],
    };
  },
  onReachBottom() {
    this.status = "loading";
    console.log("到底了");
    if (this.currentTabIndex) {
      this.pageNum = this.pageNum + 1;
      this.getAllOrder();
    }
  },
  onLoad() {
    this.getOrder();
  },
  methods: {
    change(e) {
      this.type = e;
      console.log("this.type", this.type);
      this.getOrder();
    },
    async getOrder() {
      let data = {
        type: this.type,
      };
      const { data: res } = await tokenRequest("/order/root", "GET", data);
      console.log(res);
      this.orderInfoList = res.orderInfoList;
      // console.log(this);
      // console.log(this.roomStatusList);
      // console.log(this.timeState[0], this.timeState[1]);
    },
    async getAllOrder() {
      let data = {
        pageNum: this.pageNum,
      };
      const { data: res } = await tokenRequest("/order/all", "GET", data);
      console.log(res);
      if (!this.orderInfoList) {
        this.orderInfoList = res.orderInfoList;
      } else {
        this.orderInfoList.push(...res.orderInfoList);
        this.status = "loadmore";
      }
      // this.orderInfoList = res.orderInfoList;
      // console.log(this);
      // console.log(this.roomStatusList);
      // console.log(this.timeState[0], this.timeState[1]);
    },
    changeTab(index) {
      if (index.id == 1) {
        this.getAllOrder();
      } else {
        this.getOrder();
      }

      console.log("这是index", index);
      if (this.currentTabIndex != index.id) {
        this.currentTabIndex = index.id;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 4vh;
  margin-bottom: 4vh;
}
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
}
.cardbox {
  margin-top: 2vh;
}
.context {
  ::v-deep .u-button {
    height: 3.5vh;
  }
}
.card {
  margin-bottom: 2vh;
  font-size: 13px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 84vw;
  height: 28vh;
  border-radius: 10px;
  padding-left: 4vw;
  padding-right: 4vw;
  justify-content: space-around;
  .line1 {
    justify-content: space-between;
    font-weight: bold;
    display: flex;
  }
  .line2 {
    height: 13vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 84vw;
    }
    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 84vw;
    }
    .seat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 84vw;
    }
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 84vw;
    }
  }
  .line3 {
    display: flex;
    justify-content: space-between;
    ::v-deep .u-button {
      margin-left: 2vw;
      width: 20vw;
    }
    .botton {
      display: flex;
    }
    .blank {
      font-size: 10px;
      color: gray;
    }
  }
}
.tab {
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  font-size: 14px;
  font-weight: bold;
}
.select {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100vw;
}
</style>
