<template>
  <view class="container">
    <view class="select">
      <view class="downselect">
        <u-cell
          title="查看支付订单"
          isLink
          url="pages/administrators/bookingStatus/bookingStatus"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="查看退款订单"
          isLink
          url="pages/administrators/refundOrders/refundOrders"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="上传宣传图片"
          isLink
          url="pages/administrators/uploadPictures/uploadPictures"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="上传轮播图"
          isLink
          url="pages/administrators/uploadSwiper/uploadSwiper"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>

        <u-cell
          title="更新公告"
          isLink
          url="pages/administrators/modifyBroadcast/modifyBroadcast"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="新增场地类型"
          isLink
          url="pages/administrators/addedVenue/addedVenue"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="新增和删除场地位置"
          isLink
          url="pages/administrators/newVenue/newVenue"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell
          title="删除场地类型"
          isLink
          url="pages/administrators/deleteVenue/deleteVenue"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
      </view>
    </view>
    <!-- <view class="bookingStatus"></view>
    <view class="uploadPictures"></view>
    <view class="addedVenue"></view>
    <view class="modifyBroadcast"></view>
    <view class="uploadSwiper"></view> -->
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
.container {
  display: flex;
  flex-direction: column;
}
</style>
