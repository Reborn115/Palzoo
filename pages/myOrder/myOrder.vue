<template>
  <view class="container">
    <view class="tabs">
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
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabslist: [
        {
          name: "全部",
        },
        {
          name: "待支付",
        },
        {
          name: "待使用",
        },
        {
          name: "已使用",
        },
        {
          name: "已过期",
        },
      ],
      currentTabIndex: 0,
    };
  },
  methods: {
    changeTab(index) {
      console.log("这是index", index);
      if (this.currentTabIndex != index.index) {
        this.currentTabIndex = index.index;
        console.log(this.currentTabIndex);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>
