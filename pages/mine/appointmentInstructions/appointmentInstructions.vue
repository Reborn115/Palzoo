<template>
  <view class="container">
    <view class="content">
      <view class="head">
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp预约营位建议至少提前一天预约，五一/十一黄金周建议提前5天以上预约。不接受口头预约，以实际下单为准。预订成功即默认同意本营地相关规定说明，预定前请您认真阅读本说明，感谢支持！
      </view>
      <!-- <view class="head"></view>
      <view class="head"> </view> -->
    </view>
    <view class="title"> ———— 预约说明细则 —————</view>
    <view class="content">
      <u-collapse accordion>
        <u-collapse-item title="入场押金说明">
          <view>
            1.入场顾客需缴纳场地押金，每场押金费用：100元（集装箱
            200元），押金在您确认退场时，由工作人员检查完毕后，按照原支付路径退回。
          </view>
          <view>
            2.顾客入场后仅可使用本营位设备（桌椅、上下水、烧烤炉等），不可占用其他营位设施或物品。若有违反，工作人员将进行劝告，情节严重者，场地押金将不予退回。
          </view>
          <view>
            3.营位使用每场时间为6个小时，超时0-30分钟，押金不予退回；超时30分钟及以上，需补交续场费用。
          </view>
        </u-collapse-item>
        <u-collapse-item title="场次预定说明">
          <view> 请根据营地平面图预定场地，场地选定后，不支持现场更改。 </view>
        </u-collapse-item>
        <u-collapse-item title="退款说明">
          <view>
            预定场次当日的前24小时（及以上）取消可全额退款，当日的前24小时内取消扣除50%违约款，当日取消不予退款。
            例：预定5月5日上午场，5月4日前取消可全额退款，5月4日取消扣除50%，5月5日取消不予退款。
          </view>
        </u-collapse-item>
        <u-collapse-item title="续场规则说明">
          <view>
            所有场地续场享受9折优惠。
            若需续场，请在本场结束前至少1小时内，提前告知工作人员，以免耽误后续入场顾客。
            周末及节假日等高峰时段，请在开场前告知工作人员是否续场，不可在开场后临时续场。
          </view>
        </u-collapse-item>
      </u-collapse>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.head {
  font-size: 14px;
  font-weight: bold;
}
.title {
  font-weight: bold;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
}
.content {
  margin-top: 3vh;
  padding-bottom: 3vh;
  width: 85vw;
}
</style>
