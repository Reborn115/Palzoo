<template>
  <view class="content">
    <view class="going">
      <view class="goingtext"> 正在进行 </view>
      <view class="goingtag">
        <uni-card
          :is-shadow="false"
          class="container"
          v-for="(item, index) in goingtips"
          :key="index"
        >
          <view class="info">
            <view class="title">
              <h3>{{ item.title }}</h3>
            </view>
            <view>
              <text class="sex">{{ item.gender }}</text>
              <text>{{ item.number }}</text>
            </view>
            <view>
              <text>开始时间：{{ item.goTime }}</text>
            </view>
            <view class="tags">
              <u-tag
                :text="item.category"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag>
              <u-tag
                :text="item.categoryNext"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag>
              <!-- <u-tag
                text="标签"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag> -->
            </view>
          </view>
          <view class="pickbotton">
            <u-button
              text="查看群组"
              color="linear-gradient(to bottom, #29A7FE, #62DFE5)"
              shape="circle"
            ></u-button>
          </view>
        </uni-card>
      </view>
    </view>
    <view class="finished">
      <view class="finishedtext"> 已结束 </view>
      <view class="finishedtag">
        <uni-card
          :is-shadow="false"
          class="container"
          v-for="(item, index) in finishedtips"
          :key="index"
        >
          <view class="info">
            <view class="title">
              <h3>{{ item.title }}</h3>
            </view>
            <view>
              <text class="sex">{{ item.gender }}</text>
              <text>{{ item.number }}</text>
            </view>
            <view>
              <text>开始时间：{{ item.goTime }}</text>
            </view>
            <view class="tags">
              <u-tag
                :text="item.category"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag>
              <u-tag
                :text="item.categoryNext"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag>
              <!-- <u-tag
                text="标签"
                type="info"
                shape="circle"
                plain
                borderColor="#EFEFEF"
              ></u-tag> -->
            </view>
          </view>
          <view class="pickbotton">
            <u-button
              text="查看评价"
              color="linear-gradient(to bottom, #29A7FE, #62DFE5)"
              shape="circle"
            ></u-button>
          </view>
        </uni-card>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goingtips: [
        {
          title: "容般地龙回",
          category: "能",
          categoryNext: "安",
          brief: "观专府例部派便论回青究眼少主好。",
          context:
            "局约文二传间务思风近走技实例。气决制住快况委题候历方我先议好。里次容种解产矿类关龙红再委。联式明权行好南下组法真有己矿育。次史正市至值直千展江区同明再。张维劳现京目子解王运引提军格而拉。",
          gender: 0,
          number: 9,
          goTime: "2023-04-09 11:43:36",
          startTime: "2023-04-05 13:51:13",
          endTime: "2023-04-08 07:28:14",
        },
      ],
      finishedtips: [
        {
          title: "容般地龙回",
          category: "能",
          categoryNext: "安",
          brief: "观专府例部派便论回青究眼少主好。",
          context:
            "局约文二传间务思风近走技实例。气决制住快况委题候历方我先议好。里次容种解产矿类关龙红再委。联式明权行好南下组法真有己矿育。次史正市至值直千展江区同明再。张维劳现京目子解王运引提军格而拉。",
          gender: 0,
          number: 9,
          goTime: "2023-04-09 11:43:36",
          startTime: "2023-04-05 13:51:13",
          endTime: "2023-04-08 07:28:14",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .uni-card__content {
  display: flex !important;
}
.pickbotton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 18vh;
}
::v-deep .u-button {
  width: 25vw !important;
  height: 5vh !important;
}
.container {
  display: flex;
}
::v-deep .u-tag {
  margin-right: 3vw !important;
  // width: 10vw !important;
  // align-items: center !important;
  // box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2) !important;
}
.sex {
  margin-right: 3vw;
}
.tags {
  display: flex;
}
.info {
  width: 50vw;
  height: 18vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 13px;
  color: #9a9a9a;
}
.title {
  font-size: 17px;
  font-weight: bold;
  color: black;
}
::v-deep .uni-card {
  // display: flex;
  // flex-direction: row !important;
  margin: 0 !important;
  margin-top: 2vh !important;
  // padding: 0 !important;
  border-radius: 10px;
  height: 20vh;
  width: 83.5vw;
  box-shadow: 5px 5px 8px #bebebe !important;
}
.finished {
  margin-top: 2vh;
  .finishedtext {
    font-weight: bold;
  }
}
.going {
  margin-top: 2vh;
  .goingtext {
    font-weight: bold;
  }
}
</style>
