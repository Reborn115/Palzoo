<template>
  <view class="container">
    <view class="tabs">
      <u-tabs
        @change="changeTab"
        :current="currentTabIndex"
        :list="tabslist"
        lineWidth="50"
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
        itemStyle="height: 34px;padding-left: 10vw; padding-right: 10vw;"
      >
        <template #right>
          <!-- <div class="line" /> -->
        </template>
      </u-tabs>
    </view>
    <view class="cardbox">
      <view class="card" v-for="(item, index) in orderInfoList" :key="index">
        <view class="line1">
          <view class="ticketNumber">
            {{ "交易单号：" + item.payNo }}
          </view>
          <view class="payStatus">
            {{ "待支付" }}
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
          <view class="botton">
            <u-button
              type="success"
              :plain="true"
              text="删除订单"
              size="small"
              shape="circle"
            ></u-button>
            <u-button
              type="success"
              :plain="true"
              text="取消订单"
              size="small"
              shape="circle"
            ></u-button>
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
      orderInfoList: [],
      tabslist: [
        {
          name: "全部",
        },
        {
          name: "待支付",
        },
        {
          name: "已支付",
        },
      ],
      currentTabIndex: 0,
    };
  },
  methods: {
    async getOrder() {
      const { data: res } = await request("/order/list", "POST", {
        openid: uni.getStorageSync("openid"),
      });
      console.log(res);
      this.orderInfoList = res.orderInfoList;
    },
    changeTab(index) {
      console.log("这是index", index);
      if (this.currentTabIndex != index.index) {
        this.currentTabIndex = index.index;
        console.log(this.currentTabIndex);
      }
    },
  },
  onLoad() {
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped>
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
  display: flex;
  justify-content: space-around;
}
</style>
