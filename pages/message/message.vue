<template>
  <view>
    <view class="all">
      <uni-list>
        <uni-list-chat
          v-for="(item, index) in list"
          :key="index"
          @click="gochat(item.postId)"
          :clickable="true"
          :avatar-circle="true"
          :title="item.authorName"
          :avatar="item.avatarUrl"
          :note="item.content"
          :time="item.time"
          :badge-text="item.num"
        ></uni-list-chat>
      </uni-list>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      avatarUrl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
      list: [
        // {
        //   authorName: "一起吃饭",
        //   avatarUrl: "https://s2.loli.net/2022/12/31/peTCRsJmFIq7jMc.jpg",
        //   content: "我爱你",
        //   postId: "1212112",
        // },
      ],
      timer: "",
    };
  },
  onLoad(e) {
    console.log(this.openid);
    this.getMessageList();
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    async getMessageList() {
      let openId = String(uni.getStorageSync("openid"));
      console.log("openId", openId);
      const { data: res } = await request(
        "/control/message/get" + "?openId=" + openId,
        "GET"
      );
      this.list = res;
      console.log(this.list);
    },
    gochat(postId) {
      uni.navigateTo({
        url: "/pages/message/chatroom/chatroom?postId=" + postId,
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

<style scoped lang="scss"></style>
