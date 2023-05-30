<template>
  <view class="body">
    <view class="pic">
      <image
        src="https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E8%83%8C%E6%99%AF.png"
      ></image>
    </view>
    <view class="dialog">
      <view class="text"> 在使用过程中发现异常？ </view>
      <view class="text"> 对小程序有好的建议？ </view>
      <view class="text" style="font-weight: bold; font-size: 22px">
        联系我们！
      </view>
    </view>

    <view class="info">
      <view class="lizhengdong">
        <view class="avator">
          <u--image
            :fade="true"
            duration="450"
            :lazy-load="true"
            :showLoading="true"
            src="https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E5%A4%B4%E5%83%8F1.jpeg"
            width="60px"
            height="60px"
            shape="circle"
          ></u--image>
        </view>
        <view class="instruction">
          <view class="name"> 前端开发-李政东 </view>
          <view class="school"> 天津理工大学 </view>
          <view class="email"> 3209562144@qq.com </view>
        </view>
      </view>
      <view class="lizhengdong">
        <view class="avator">
          <u--image
            :fade="true"
            duration="450"
            :lazy-load="true"
            :showLoading="true"
            src="https://img.haorui.xyz/%E5%87%AF%E4%BC%A6%E7%94%B0%E5%9B%AD/%E5%A4%B4%E5%83%8F2.jpeg"
            width="60px"
            height="60px"
            shape="circle"
          ></u--image>
        </view>
        <view class="instruction">
          <view class="name"> 后端开发-韦秉芮 </view>
          <view class="school"> 天津理工大学 </view>
          <view class="email"> 1473352497@qq.com </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.dialog {
  margin-top: 3vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5vh;
}
.text {
  margin-bottom: 1vh;
}
.lizhengdong {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.email {
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.school {
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.name {
  height: 6vh;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.info {
  display: flex;
  justify-content: space-around;
  height: 20vh;
  width: 80vw;
  align-self: center;
  background: transparent;
  padding: 1rem 1rem;
  margin: 0 1rem;
  transition: all 0.5s ease;
  color: #41403e;
  font-size: 2rem;
  letter-spacing: 1px;
  outline: none;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: solid 7px #41403e;
}

.body {
  background-color: white;
  height: 100vh;
  width: 100vw;
  padding-top: 5vh;
}
.pic {
  height: 500rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  //   margin-top: 20vh;
}
</style>
