<template>
  <view class="container">
    <u-modal
      :show="isDelete"
      showCancelButton
      closeOnClickOverlay
      content="确认删除该场地吗？"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="closeDelete"
    >
    </u-modal>
    <u-modal
      :show="isAdd"
      showCancelButton
      closeOnClickOverlay
      @confirm="confirmAdd"
      @cancel="cancelAdd"
      @close="closeAdd"
    >
      <view class="box">
        <view class="title"> 新增场地编号： </view>
        <uni-easyinput
          type="text"
          v-model="location"
          placeholder="请输入新增场地编号"
        />
      </view>
    </u-modal>
    <u-toast ref="uToast"></u-toast>
    <view class="select">
      <view class="text">选择场地类型：</view>
      <uni-data-select
        v-model="typeId"
        :localdata="tabslist"
        @change="change"
        placeholder="请选择要操作的场地类型"
        :clear="false"
      ></uni-data-select>
    </view>
    <view class="botton">
      <u-button type="primary" text="新增场地" @click="showAdd"></u-button>
    </view>
    <view class="positionBotton">
      <view class="item" v-for="(item, index) in locationList" :key="index">
        <u-button :text="item.location" size="small"></u-button>
        <view class="delete">
          <u-button
            text="删除"
            size="small"
            type="error"
            @click="showDelete(item.roomId)"
          ></u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
import tokenRequest from "@/request/tokenRequest.js";
export default {
  data() {
    return {
      roomId: "",
      isDelete: false,
      location: "",
      isAdd: false,
      locationList: [],
      typeId: 1,
      tabslist: [],
    };
  },
  onLoad() {
    this.getRoomList();
    this.getLocation();
  },
  methods: {
    confirmDelete() {
      this.isDelete = false;
      this.deleteConfirm();
      console.log("confirm");
    },
    cancelDelete() {
      this.isDelete = false;
      console.log("cancel");
    },
    closeDelete() {
      this.isDelete = false;
      console.log("close");
    },
    showDelete(roomId) {
      console.log("roomid", roomId);
      this.roomId = roomId;
      this.isDelete = true;
      console.log("this.roomid", this.roomId);
    },
    async deleteConfirm() {
      let data = {
        roomId: this.roomId,
      };
      const res = await tokenRequest("/delete/location", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.getLocation();
        this.showToast({
          type: "success",
          message: res.message,
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
    async addConfirm() {
      let data = {
        typeId: this.typeId,
        location: this.location,
      };
      const res = await tokenRequest("/add/location", "POST", data);
      console.log("res", res);
      if (res.code == "00000") {
        this.getLocation();
        this.showToast({
          type: "success",
          message: res.message,
        });
      } else {
        this.showToast({
          type: "error",
          message: res.message,
        });
      }
    },
    confirmAdd() {
      this.isAdd = false;
      this.addConfirm();
      console.log("confirm");
    },
    cancelAdd() {
      this.isAdd = false;
      console.log("cancel");
    },
    closeAdd() {
      this.isAdd = false;
      console.log("close");
    },
    showAdd() {
      this.isAdd = true;
    },
    async getLocation() {
      let data = {
        typeId: this.typeId,
      };
      const { data: res } = await tokenRequest("/show/location", "GET", data);
      console.log(res);
      this.locationList = res.addLocalList;
    },

    change(e) {
      this.typeId = e;
      console.log("this.typeId", this.typeId);
      this.getLocation();
    },
    async getRoomList() {
      const { data: res } = await request("/list/type", "GET");
      console.log(res);
      this.tabslist = JSON.parse(
        JSON.stringify(res.typeNameList).replace(/id/g, "value")
      );
      this.tabslist = JSON.parse(
        JSON.stringify(this.tabslist).replace(/name/g, "text")
      );
      console.log("this.tabslist", this.tabslist);
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,
        complete() {
          params.url &&
            uni.navigateTo({
              url: params.url,
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  .delete {
    ::v-deep .u-button {
      margin-left: 2vw;
      //   margin-top: 1vh;
      width: 10vw !important;
      margin-bottom: 1vh;
      border-radius: 10px !important;
    }
  }
}
.box {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  margin-top: 3vh;
  width: 90vw;
  align-items: center;
}
.positionBotton {
  padding-top: 2vh;
  // height: 16vh;
  width: 80vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: space-around;
  ::v-deep .u-button {
    width: 60vw;
    margin-bottom: 1vh;
  }
}
.botton {
  ::v-deep .u-button {
    margin-top: 2vh;
    width: 90vw !important;
    margin-bottom: 3vh;
    border-radius: 10px !important;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.select {
  .text {
    font-size: 14px;
    font-weight: bold;
  }
  ::v-deep .uni-select {
    width: 50vw;
  }
  align-items: center;
  justify-content: center;
  display: flex;
  width: 90vw;
  margin-top: 4vh;
  margin-bottom: 1vh;
}
</style>
