<template>
  <view class="content">
    <u-toast ref="uToast"></u-toast>
    <!-- 聊天内容 -->
    <!-- scroll-view滚动视图  scroll-into-view设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
    <scroll-view class="chat" scroll-y="true" :scroll-into-view="scrollToView">
      <!-- 下内边距可滚动 -->
      <view class="chat-main" :style="{ paddingBottom: inputh + 'px' }">
        <!-- 遍历消息列表 -->
        <view
          class="chat-ls"
          v-for="(item, index) in msg"
          :key="index"
          :id="'msg' + index"
        >
          <!-- 每条消息上方显示的时间 -->
          <view class="chat-time" v-if="item.time != ''">{{ item.time }}</view>

          <!-- 对方的消息-->
          <view
            class="msg-m msg-left"
            v-if="item.openid && item.openid != this.openid"
          >
            <!-- 头像 -->
            <image class="user-img" :src="otherhead"></image>
            <!-- 发送的内容是文字时 -->
            <view class="message">
              <view class="msg-text">{{ item.message }}</view>
            </view>
          </view>

          <!-- 我发的消息-->
          <view
            class="msg-m msg-right"
            v-if="!item.openid || item.openid == this.openid"
          >
            <image class="user-img" :src="myhead"></image>
            <view class="message">
              <view class="msg-text">{{ item.message }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 给子组件传入inputs和heights -->
    <submit @sendMessage="sendMessage" @heights="heights"></submit>
  </view>
</template>

<script>
import dateTime from "../dateTime";
import submit from "../submit.vue";
export default {
  data() {
    return {
      postId: "",
      openid: uni.getStorageSync("openid"),
      // 聊天室房间号
      // roomId: 0,
      //我的id
      meId: uni.getStorageSync("username"),
      otherId: 0,
      token: uni.getStorageSync("token"),
      // 对方头像
      otherhead: "",
      // 我的头像
      myhead: uni.getStorageSync("avatarUrl"),
      //聊天记录
      msg: [
        // {
        //   openid: "or6L_5JOa9Heqt15s1QSjEBs97to",
        //   time: "2023-04-01 19:00:00",
        //   message: "我爱你",
        // },
      ],
      //高度控制 滚动到该元素
      scrollToView: "",
      //高度控制
      inputh: "90",
      socketTask: null,
      // websocket状态
      isopen: false,
    };
  },
  onLoad(e) {
    console.log("touxiang", uni.getStorageSync("avatarUrl"));
    if (!uni.getStorageSync("openid")) {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }
    console.log("openid", this.openid);
    console.log(e.postId);
    this.postId = String(e.postId);
    console.log(this.postId);
    // this.roomId = JSON.parse(e.roomId);
    // let tit = JSON.parse(e.name);
    // uni.setNavigationBarTitle({
    //   title: tit,
    // });
    // this.getperson();
    // this.getPrevious();
    this.openSocket();
  },
  onShow() {
    // this.getPrevious();
  },
  onUnload() {
    this.closeSocket();
  },
  // 组件注册
  components: {
    submit,
  },
  methods: {
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
    // 获取聊天者信息
    getperson() {
      uni.request({
        url: "https://api.yuleng.top:38088/api/room-members",
        data: {
          roomId: this.roomId,
          type: 1,
        },
        header: {
          token: uni.getStorageSync("token"),
        },
        success: (res) => {
          // console.log(res,'person')
          res.data.data.roomMembers.forEach((item) => {
            if (item.id == this.meId) {
              this.myhead = item.headPicUrl;
            } else {
              this.otherhead = item.headPicUrl;
              this.otherId = item.id;
            }
          });
        },
      });
    },
    // 获取历史记录
    // getPrevious() {
    //   uni.request({
    //     url: "https://api.yuleng.top:38088/api/message-detail",
    //     data: {
    //       roomId: this.roomId,
    //     },
    //     header: {
    //       token: uni.getStorageSync("token"),
    //     },
    //     success: (res) => {
    //       // console.log(res,'room')
    //       this.msg = res.data.data.messageResultList;
    //       //定时器解决不能跳转到底部
    //       setTimeout(() => {
    //         this.goBottom();
    //       }, 80);
    //       this.clearMesssage();
    //     },
    //   });
    // },
    //清空未读消息数
    clearMesssage() {
      uni.request({
        url:
          "https://api.yuleng.top:38088/api/message-read?roomId=" +
          this.roomId +
          "&type=1",
        method: "POST",
        header: {
          token: uni.getStorageSync("token"),
        },
        success: (res) => {
          console.log("清空消息成功");
        },
      });
    },
    // 转换时间
    changeTime(date) {
      return dateTime.dateTime1(date);
    },
    ////发送消息 接受输入内容
    sendMessage(e) {
      //发送的数据时间处理
      let msgdata = {
        toUserId: this.otherId,
        fromUserId: this.meId,
        message: e,
        time: this.changeTime(new Date()),
      };
      // 发送消息
      if (this.isopen) {
        uni.sendSocketMessage({
          data: '{"message":"' + e + '"}',
          success: () => {
            this.msg.push(msgdata);
            console.log("beforenexttick", this.msg);
            this.goBottom();
            // 跳转滚动到最后一条数据;
            // this.$nextTick(function () {
            //   console.log("nexttick", this.msg);
            //   // this.scrollToView = "msg" + (this.msg.length - 1);
            // });
          },
        });
      }
    },
    //输入框高度
    heights(e) {
      console.log("高度:", e);
      this.inputh = e;
      this.goBottom();
    },
    // 滚动到底部
    goBottom() {
      this.scrollToView = "";
      // this.$nextTick(function() {
      this.scrollToView = "msg" + (this.msg.length - 1);
      // })
    },
    // // 开启websocket
    openSocket() {
      console.log("chatroom", this.postId);
      // 打开 websocket
      this.socketTask = uni.connectSocket({
        url:
          "wss://www.haorui.xyz/chat" +
          "?openid=" +
          this.openid +
          "&postId=" +
          this.postId,
        success(data) {
          console.log("websocket连接成功");
        },
      });
      //连接
      uni.onSocketOpen(() => {
        console.log("WebSocket连接已打开！");
        this.isopen = true;
      });
      //出错
      uni.onSocketError(function () {
        console.log("WebSocket连接打开失败，请检查！");
      });
      //接收对方发来的消息
      uni.onSocketMessage((res) => {
        this.goBottom();
        if (res.data != "连接成功") {
          // this.$api.msg('你有新的消息');
          // res.data = res.data;
          res.data = JSON.parse(res.data);
          // console.log("收到服务器内容：res.data.openid" + res.data.openid);
          // console.log("收到服务器内容：res.data.time" + res.data.time);
          // if (
          //   res.data.openid != uni.getStorageSync("openid") &&
          //   res.data.openid != "system"
          // ) {
          // console.log("进来了");
          if (res.data.openid == "system") {
            console.log(res.data.message);
            let openid = res.data.message.split(",")[0];
            console.log("openid", openid);
            openid = "用户" + openid + "驾到";
            this.showToast({
              type: "success",
              message: openid,
            });
          } else {
            this.msg.push(res.data);
            console.log("收到服务器内容：this.message", this.msg);
            this.goBottom();
          }

          // console.log(this.openid);
          // }
          // if (res.data.responseType == "zzrServer") {

          // }
          // this.goBottom();
        }
        // this.$nextTick(function () {
        //   this.scrollToView = "msg" + (this.msg.length - 1);
        // });
      });
    },
    //关闭Socket
    closeSocket() {
      // console.log("关闭Socket");
      // uni.closeSocket(() => {
      this.isopen = false;
      //   console.log("关闭Socket成功");
      // });
      uni.closeSocket({
        success: function (res) {
          console.log("WebSocket关闭成功！", res);
        },
        fail: function (res) {
          console.log("WebSocket关闭失败！", res);
        },
      });
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
}

.content {
  height: 100%;
  background-color: rgba(244, 244, 244, 1);
}

.chat {
  height: 100%;

  .chat-main {
    padding-left: 32rpx;
    padding-right: 32rpx;
    padding-top: 20rpx;
    // padding-bottom: 120rpx;  //获取动态高度
    display: flex;
    flex-direction: column;
  }

  .chat-ls {
    .chat-time {
      font-size: 24rpx;
      color: rgba(39, 40, 50, 0.3);
      line-height: 34rpx;
      padding: 10rpx 0rpx;
      text-align: center;
    }
    // .nameleft{
    // 	display: inline-block;
    // 	position: absolute;
    // 	margin-left: 96rpx;
    // 	font-size: 27rpx;
    // 	color: rgba(39, 40, 50, 0.3);
    // }
    // .nameright{
    // 	display: inline-block;
    // 	position: absolute;
    // 	margin-right: 96rpx;
    // 	font-size: 27rpx;
    // 	color: rgba(39, 40, 50, 0.3);
    // }
    .msg-m {
      display: flex;
      padding: 20rpx 0;

      .user-img {
        flex: none;
        width: 80rpx;
        height: 80rpx;
        border-radius: 20rpx;
      }
      .message {
        flex: none;
        max-width: 480rpx;
      }

      .msg-text {
        font-size: 32rpx;
        color: rgba(39, 40, 50, 1);
        line-height: 44rpx;
        padding: 18rpx 24rpx;
      }

      .msg-img {
        max-width: 400rpx;
        border-radius: 20rpx;
      }

      .msg-map {
        background: #fff;
        width: 464rpx;
        height: 284rpx;
        overflow: hidden;

        .map-name {
          font-size: 32rpx;
          color: rgba(39, 40, 50, 1);
          line-height: 44rpx;
          padding: 18rpx 24rpx 0 24rpx;
          //下面四行是单行文字的样式
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .map-address {
          font-size: 24rpx;
          color: rgba(39, 40, 50, 0.4);
          padding: 0 24rpx;
          //下面四行是单行文字的样式
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .map {
          padding-top: 8rpx;
          width: 464rpx;
          height: 190rpx;
        }
      }

      .voice {
        // width: 200rpx;
        min-width: 100rpx;
        max-width: 400rpx;
      }

      .voice-img {
        width: 28rpx;
        height: 36rpx;
      }
    }

    .msg-left {
      flex-direction: row;

      .msg-text {
        margin-left: 16rpx;
        background-color: #fff;
        border-radius: 0rpx 20rpx 20rpx 20rpx;
        // margin-top: 35rpx;
      }

      .ms-img {
        margin-left: 16rpx;
      }

      .msh-map {
        margin-left: 16rpx;
        border-radius: 0rpx 20rpx 20rpx 20rpx;
      }

      .voice {
        text-align: right;
      }

      .voice-img {
        float: left;
        transform: rotate(180deg);
        width: 28rpx;
        height: 36rpx;
        padding-bottom: 4rpx;
      }
    }

    .msg-right {
      flex-direction: row-reverse;

      .msg-text {
        margin-right: 16rpx;
        background-color: rgba(255, 228, 49, 0.8);
        border-radius: 20rpx 0rpx 20rpx 20rpx;
        // margin-top: 35rpx;
      }

      .ms-img {
        margin-right: 16rpx;
      }

      .msh-map {
        margin-left: 16rpx;
        border-radius: 20rpx 0rpx 20rpx 20rpx;
      }

      .voice {
        text-align: left;
      }

      .voice-img {
        float: right;
        padding: 4rpx;
        width: 28rpx;
        height: 36rpx;
      }
    }
  }
}
</style>
