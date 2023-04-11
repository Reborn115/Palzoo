<template>
  <view>
    <view class="all">
      <uni-list>
        <uni-list-chat
          v-for="(item, index) in list"
          :key="index"
          @click="gochat(item.roomId, item.type, item.name)"
          :clickable="true"
          :avatar-circle="true"
          :title="item.name"
          :avatar="item.headPicUrl"
          :note="item.latestMessage"
          :time="item.time"
          :badge-text="item.num"
        ></uni-list-chat>
      </uni-list>
    </view>
  </view>
</template>

<script>
import dateTime from "./dateTime";
export default {
  data() {
    return {
      list: [
        {
          name: "肥肥鲨",
          headPicUrl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
          latestMessage: "我爱你",
          time: "2023-01-05 14:00",
          num: "6",
        },
      ],
      timer: "",
    };
  },
  onShow() {
    this.getMessageList();
    this.timer = setInterval(() => {
      this.getMessageList();
    }, 2000);
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    gochat(roomId, type, name) {
      if (type == 1) {
        clearInterval(this.timer);
        uni.navigateTo({
          url:
            "/pages/chat/chat?roomId=" +
            JSON.stringify(roomId) +
            "&name=" +
            JSON.stringify(name),
        });
      } else {
        clearInterval(this.timer);
        uni.navigateTo({
          url:
            "/pages/chat/chatgroup?roomId=" +
            JSON.stringify(roomId) +
            "&name=" +
            JSON.stringify(name),
        });
      }
    },
    getMessageList() {
      uni.request({
        url: "https://api.yuleng.top:38088/api/message-num-list",
        header: {
          token: uni.getStorageSync("token"), //自定义请求头信息
        },
        success: (res) => {
          console.log(res);
          res.data.data.messageNumList.forEach((item, index) => {
            let time = item.time * 1000;
            item.time = dateTime.dateTime(time);
          });
          this.list = res.data.data.messageNumList;
          console.log(this.list);
        },
      });
    },
    addchat() {
      uni.navigateTo({
        url: "/pages/chat/addchat/addchat",
      });
    },
  },
};
</script>

<style scoped lang="scss">
// .all {
//   padding-top: 170rpx;
// }
</style>
