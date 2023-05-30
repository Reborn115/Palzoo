<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <u-modal
      :show="isRefund"
      showCancelButton
      closeOnClickOverlay
      content="确定同意退款吗？"
      @confirm="confirmRefund"
      @cancel="cancelRefund"
      @close="closeRefund"
    >
      <u-toast ref="uToast1"></u-toast>
      <view class="box">
        <view class="title"> 输入退款金额： </view>
        <uni-easyinput
          type="text"
          v-model="refund"
          placeholder="请输入退款金额："
        />
      </view>
    </u-modal>
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
            {{ item.isPay == 1 ? "已支付" : "待退款" }}
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
            <!-- <u-button
              @click="cancelOrder(item)"
              :type="success"
              :plain="true"
              text="取消订单"
              size="small"
              shape="circle"
              :disabled="isPay ? true : false"
            ></u-button> -->
            <u-button
              type="error"
              :plain="true"
              text="同意退款"
              size="small"
              shape="circle"
              @click="showRefund(item)"
            ></u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import request from "@/request/request.js";
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      timer2: "",
      timer1: "",
      refund: 0,
      payNo: "",
      orderInfoList: [],
      isRefund: false,
    };
  },
  onLoad() {
    this.getOrder();
  },
  methods: {
    async refundEnd() {
      let data = {
        payNo: this.payNo,
        refund: this.refund,
      };
      const res = await tokenRequest("/refund/order", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.timer1 = setTimeout(() => {
          this.getOrder();
        }, 1000);
        this.timer2 = setTimeout(() => {
          this.getOrder();
        }, 2000);
        this.showToast({
          type: "success",
          message: res.message,
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
    confirmRefund() {
      console.log(this.payNo, this.refund);
      const r = /^\+?[1-9][0-9]*$/; //正整数
      if (!r.test(this.refund)) {
        console.log("进来了");
        this.showToast1({
          type: "error",
          message: "请输入正整数！",
        });
      } else {
        this.isRefund = false;
        this.refundEnd();
      }

      console.log("confirm");
    },
    cancelRefund() {
      this.isRefund = false;
      console.log("cancel");
    },
    closeRefund() {
      this.isRefund = false;
      console.log("close");
    },
    showRefund(item) {
      console.log(item);
      this.payNo = item.payNo;
      // this.refund = item.price;
      console.log(this.payNo, this.refund);
      this.isRefund = true;
    },
    async getOrder() {
      const { data: res } = await tokenRequest("/list/refund", "GET");
      console.log(res);
      this.orderInfoList = res.orderInfoList;
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
    showToast1(params) {
      this.$refs.uToast1.show({
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
.box {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  margin-top: 3vh;
  width: 90vw;
  align-items: center;
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
</style>
