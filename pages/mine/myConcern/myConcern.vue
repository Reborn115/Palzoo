<template>
  <view>
    <view class="tabs">
      <u-sticky bgColor="linear-gradient(to right, #12D8FA, #a5fecb)">
        <u-tabs
          @change="change"
          :current="currentTabIndex"
          :list="tabslist"
          lineColor="white"
          :activeStyle="{
            color: 'white',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
          }"
          :inactiveStyle="{
            color: 'white',
            transform: 'scale(1)',
          }"
          itemStyle="height: 34px;"
        >
          <template #right>
            <!-- <div class="line" /> -->
          </template>
        </u-tabs>
      </u-sticky>
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

<style lang="scss" scoped></style>
