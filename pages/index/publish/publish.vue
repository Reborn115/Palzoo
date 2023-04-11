<template>
  <view class="content">
    <u-toast ref="uToast"></u-toast>
    <view class="one">
      <view class="title">
        <u--text text="标题：" class="text"></u--text>
      </view>

      <u--textarea
        v-model="form.title"
        placeholder="例如：找一起去南京看演唱会的"
        height="3vh"
      ></u--textarea>
    </view>
    <view class="two">
      <view class="description">
        <u--text text="详细描述：" class="text" count></u--text>
      </view>

      <u--textarea
        v-model="form.details"
        placeholder="例如：打算5月24日坐高铁去南京，去玩一天，可以一起去，也可以各玩各的，第二天一起拼车去看演唱会，看完演唱会，预计当天坐高铁返回天津，然后一起打车返校，有意向者来。"
        height="20vh"
        width="10vw"
      ></u--textarea>
    </view>
    <view class="three">
      <view class="sex">
        <view class="text">
          <u--text text="性别：" class="text"></u--text>
        </view>

        <u-radio-group v-model="form.sex" placement="row">
          <u-radio
            :customStyle="{ marginRight: '16px' }"
            v-for="(item, index) in radiosex"
            :key="index"
            :label="item.name"
            :name="item.value"
          >
          </u-radio>
        </u-radio-group>
      </view>
      <view class="count">
        <view class="text">
          <u--text text="人数：" class="text"></u--text>
        </view>
        <uni-data-select
          v-model="form.count"
          :localdata="radiocount"
          @change="change"
        ></uni-data-select>
        <view class="notice" style="margin-left: 2vw">
          <view>建议在想找的人数上多1-2人</view>
        </view>
      </view>
      <view class="paltime">
        <view class="paltext">
          <u--text text="Pal时间：" class="text"></u--text>
        </view>
        <view class="datapiker">
          <uni-datetime-picker
            type="datetime"
            v-model="form.paltime"
            @change="changeLog"
          />
        </view>
      </view>
      <view class="notice">
        <view> 此时间为集合/出发时间 </view>
      </view>
    </view>
    <view class="four">
      <view class="tag">
        <u--text text="标签：" class="text"></u--text>
      </view>
      <view class="tagselect">
        <uni-data-select
          v-model="form.tag1"
          :localdata="radiotag"
          @change="change"
        ></uni-data-select>
        <!-- <uni-data-select
          v-model="form.tag2"
          :localdata="radiotag"
          @change="change"
        ></uni-data-select> -->
      </view>
    </view>
    <view class="five">
      <u-button
        text="确定"
        color="linear-gradient(to bottom, #3BCAF2, #95F5D0)"
        shape="circle"
        @click="submit(this.form)"
      ></u-button>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      form: {
        title: null,
        details: null,
        sex: null,
        count: null,
        paltime: null,
        tag1: null,
        tag2: null,
      },
      radiotag: [
        { value: "运动", text: "运动" },
        { value: "美食", text: "美食" },
        { value: "出行", text: "出行" },
        { value: "学习", text: "学习" },
        { value: "其他", text: "其他" },
      ],
      radiocount: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 7, text: "7" },
        { value: 8, text: "8" },
        { value: 9, text: "9" },
        { value: 10, text: "10" },
        { value: 11, text: "11" },
        { value: 12, text: "12" },
        { value: 13, text: "13" },
        { value: 14, text: "14" },
        { value: 15, text: "15" },
        { value: 16, text: "16" },
        { value: 17, text: "17" },
        { value: 18, text: "18" },
        { value: 19, text: "19" },
        { value: 20, text: "20" },
      ],
      radiosex: [
        {
          value: 0,
          name: "性别不限",
          disabled: false,
        },
        {
          value: 1,
          name: "男生",
          disabled: false,
        },
        {
          value: 2,
          name: "女生",
          disabled: false,
        },
      ],
    };
  },
  methods: {
    async submit(form) {
      let subform = {
        openId: uni.getStorageSync("openid"),
        title: form.title,
        category: form.tag1,
        categoryNext: null,
        context: form.details,
        gender: form.sex,
        number: form.count,
        goTime: form.paltime,
      };
      console.log(subform);
      const res = await request("/controller/topic/submit", "POST", subform);
      // uni.setStorage({
      //   key: "sessionKey",
      //   data: res.sessionKey,
      // });
      // uni.setStorage({
      //   key: "openid",
      //   data: res.openid,
      // });
      // console.log(res);
      console.log(res);
      if (res.code == "00000") {
        this.showToast({
          type: "success",
          message: res.message,
          url: "/pages/index/index",
        });
      }

      console.log(res);
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,
        complete() {
          params.url &&
            uni.switchTab({
              url: params.url,
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  font-size: 13px;
  color: #9a9a9a;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 0.5vh;
}
.five {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
}
.tagselect {
  width: 39vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  margin-top: 2.5vh;
  margin-left: 2vh;
}
.four {
  display: flex;
  background-color: white;
  margin-bottom: 2vh;
  height: 8vh;
  width: 90vw;
  border-radius: 10px;
}
.datapiker {
  width: 55vw;
}
.paltext {
  display: flex;
  align-items: center;
  width: 20vw;
}
.paltime {
  display: flex;
  margin-top: 2vh;
  margin-left: 2vh;
}
.count {
  display: flex;
  margin-top: 2vh;
  margin-left: 2vh;
}
.text {
  display: flex;
  align-items: center;
  width: 14vw;
}
.sex {
  display: flex;
  margin-top: 2vh;
  margin-left: 2vh;
}
.three {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  background-color: white;
  margin-bottom: 2vh;
  height: 25vh;
  width: 90vw;
  border-radius: 10px;
}
.description {
  margin-top: 2vh;
  margin-left: 1vh;
}
.two {
  padding-left: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  margin-bottom: 2vh;
  height: 30vh;
  width: 88vw;
  border-radius: 10px;
}
.title {
  margin-top: 1vh;
  margin-left: 2vh;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.one {
  display: flex;
  background-color: white;
  margin-top: 2vh;
  margin-bottom: 2vh;
  height: 5vh;
  width: 90vw;
  border-radius: 10px;
}
</style>
