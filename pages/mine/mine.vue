<template>
  <view>
    <view class="header">
      <view class="avator">
        <u--image
          :fade="true"
          duration="450"
          :lazy-load="true"
          :showLoading="true"
          :src="avatorurl"
          width="80px"
          height="80px"
          @click="click"
          shape="circle"
        ></u--image>
      </view>
      <view class="text">
        <text class="nametext">{{ name }}</text>
        <text class="schooltext">{{ school }}</text>
      </view>
    </view>
    <view class="select">
      <view class="upselect">
        <u-cell-group>
          <u-cell
            title="个人主页"
            isLink
            url="pages/mine/personalPage/personalPage"
          >
            <image
              slot="icon"
              src="https://cdn.uviewui.com/uview/demo/picker/2.png"
              mode="widthFix"
            ></image>
          </u-cell>
        </u-cell-group>
      </view>
      <view class="downselect">
        <u-cell
          title="我的关注与黑名单"
          isLink
          url="pages/mine/myConcern/myConcern"
        >
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
        <u-cell title="我的组队" isLink url="pages/mine/myTeam/myTeam">
          <image
            slot="icon"
            src="https://cdn.uviewui.com/uview/demo/picker/2.png"
            mode="widthFix"
          ></image>
        </u-cell>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: "肥肥鲨",
      school: "天津理工大学",
      avatorurl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
    };
  },
};
</script>

<style lang="scss" scoped>
.downselect {
  margin-top: 2vh;
  background-color: white;
}
.upselect {
  background-color: white;
  margin-top: 2vh;
}
.header {
  display: flex;
  //   justify-content: center;
  align-items: center;
  height: 20vh;
  background-image: linear-gradient(to bottom, #3bcaf2, #95f5d0) !important;
  .avator {
    margin-left: 8vw;
  }
  .text {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 10vh;
    .nametext {
      margin-left: 8vw;
    }
    .schooltext {
      font-size: 0.8rem;
      margin-left: 8vw;
    }
  }
}
</style>
