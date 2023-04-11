<template>
  <view>
    <view class="submit">
      <view class="submit-chat">
        <!-- <view class="bt-img" @click="changeType">
          <image src="../../static/phone (1).png"></image>
        </view> -->
        <!-- 输入文本框 -->
        <textarea
          auto-height="true"
          class="chat-send btn"
          :class="{ displaynone: isrecord }"
          @input="inputs2"
          @focus="focus"
          v-model="msg"
        ></textarea>
        <view class="bt-img" @click="inputs">
          <image src="../../static/send.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 引入组件
import emoji from "./emoji.vue";
export default {
  data() {
    return {
      // 文本框的显示与隐藏
      isrecord: false,
      // 表情的显示与隐藏
      isemoji: false,
      // 更多的显示与隐藏
      ismore: false,
      // 文本框输入的内容
      msg: "",
    };
  },
  components: {
    emoji,
  },
  methods: {
    //获取高度方法
    getElementHeight() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".submit")
        .boundingClientRect((data) => {
          console.log(data, "height");
          this.$emit("heights", data.height);
        })
        .exec();
    },
    //点击按钮发送
    inputs() {
      if (this.msg != "") {
        // 0为表情和文字
        this.send(this.msg);
      }
    },
    //打开视频通话弹窗
    changeType() {
      this.$refs.popup.open();
    },
    // 回车发送
    inputs2(e) {
      // console.log("submit回车发送", this.msg);
      var chatm = e.detail.value;
      var pos = chatm.indexOf("\n");
      // 检索字符串没有数据，返回-1
      if (pos != -1 && chatm.length > 1) {
        // 去掉回车字符
        this.msg = this.msg.substring(0, this.msg.length - 1);
        // console.log("submit去掉回车字符", this.msg);
        // 触发发送消息函数
        this.send(this.msg);
        // console.log("submit回车发送", this.msg);
      }
    },
    // 输入框聚焦
    focus() {
      //关闭其他项
      this.isemoji = false;
      this.ismore = false;
      setTimeout(() => {
        this.getElementHeight();
      }, 0);
    },
    // 表情内发送
    // emojiSend() {
    // 	// if (this.msg.length > 0) {
    // 	// 	this.$emit('inputs', this.msg);
    // 	// 	setTimeout(() => {
    // 	// 		this.msg = '';
    // 	// 	}, 0)
    // 	// }

    // 	if (this.msg.length > 0) {
    // 		//0为表情和文字
    // 		this.send(this.msg, 0)
    // 	}
    // },
    // // 表格退格
    // emojiBack() {
    // 	if (this.msg.length > 0) {
    // 		this.msg = this.msg.substring(0, this.msg.length - 1);
    // 	}
    // },
    //更多功能
    more() {
      this.ismore = !this.ismore;
      //切换的时候关闭其他界面
      this.isemoji = false;
      this.isrecord = false;
      setTimeout(() => {
        this.getElementHeight();
      }, 0);
    },
    //发送
    send(msg) {
      // 向主页面传输数据
      console.log("传给主页", msg);
      this.$emit("sendMessage", msg);
      this.msg = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.submit {
  background: rgba(244, 244, 244, 0.96);
  border-top: 1px solid rgba(39, 40, 50, 0.1);
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  // padding-bottom: var(--status-bar-height);
  padding-bottom: env(safe-area-inset-bottom);
}

.displaynone {
  display: none;
}

.submit-chat {
  width: 100%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 14rpx 14rpx;

  image {
    width: 56rpx;
    height: 56rpx;
    margin: 0 10rpx;
    flex: auto;
  }

  .btn {
    flex: auto;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    max-height: 160rpx;
    margin: 0 10rpx;
  }

  .chat-send {
    line-height: 44rpx;
  }

  .record {
    line-height: 44rpx;
    text-align: center;
    font-size: 20rpx;
    color: rgba(39, 40, 50, 0.6);
  }
}

.emoji-send-bt {
  flex: 1;
  margin: 0 32rpx 0 20rpx;
  height: 80rpx;
  width: 300rpx !important;
  background: rgba(255, 228, 49, 1);
  font-size: 32rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 12rpx;
}

.emoji {
  width: 100%;
  height: 460rpx;
  background: rgba(236, 237, 238, 1);
  box-shadow: 0px 11rpx 0px 0px rgba(0, 0, 0, 0.1);

  .emoji-send {
    width: 280rpx;
    height: 104rpx;
    padding-top: 24rpx;
    background-color: rgba(236, 237, 238, 0.8);
    position: fixed;
    // bottom: 0;
    bottom: env(safe-area-inset-bottom);
    right: 0;
    display: flex;

    .emoji-send-bt {
      flex: 1;
      margin: 0 32rpx 0 20rpx;
      height: 80rpx;
      background: rgba(255, 228, 49, 1);
      font-size: 32rpx;
      text-align: center;
      line-height: 80rpx;
      border-radius: 12rpx;
    }

    .emoji-send-det {
      flex: 1;
      margin-left: 24rpx;
      height: 80rpx;
      background: #fff;
      font-size: 32rpx;
      text-align: center;
      line-height: 80rpx;
      border-radius: 12rpx;

      image {
        width: 42rpx;
        height: 32rpx;
      }
    }
  }
}

.more {
  width: 100%;
  height: 436rpx;
  // height: 556rpx;
  background: rgba(236, 237, 238, 1);
  box-shadow: 0px 11rpx 0px 0px rgba(0, 0, 0, 0.1);
  bottom: env(safe-area-inset-bottom);
  padding: 8rpx 20rpx;
  box-sizing: border-box;

  .more-list {
    width: 25%;
    text-align: center;
    float: left;
    padding-top: 32rpx;

    image {
      width: 72rpx;
      height: 72rpx;
      padding: 24rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 24rpx;
    }

    .more-list-title {
      font-size: 24rpx;
      color: rgba(39, 40, 50, 0.5);
      line-height: 34rpx;
    }
  }
}

.voice-bg {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1001;

  .voice-bg-len {
    height: 84rpx;
    width: 600rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 42rpx;
    text-align: center;
  }

  .voice-bg-time {
    display: inline-block;
    min-width: 120rpx;
    line-height: 84rpx;
    background-color: rgba(255, 228, 49, 1);
    border-radius: 42rpx;
  }

  .voice-del {
    position: absolute;
    bottom: -480rpx;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
  }
}
.change {
  height: 520rpx;
  width: 600rpx;
  .button {
    display: inline-block;
    // background-color: #fff0a1;
    width: 300rpx;
    height: 400rpx;
    .mini-btn1 {
      font-size: 36rpx;
      font-weight: 700;
      color: #ffffff;
      height: 7vh;
      width: 36vw;
      line-height: 7vh;
      margin-top: 10rpx;
      margin-bottom: 42rpx;
      border-radius: 23rpx;
    }
    .btncolor1 {
      background: linear-gradient(#eeb7ec, #9f84e0);
    }
    .btncolor2 {
      background: linear-gradient(#55caf3, #3c82df);
    }
    .btncolor3 {
      background: linear-gradient(#d9c0fa, #abc1f9);
    }
  }
}
</style>
