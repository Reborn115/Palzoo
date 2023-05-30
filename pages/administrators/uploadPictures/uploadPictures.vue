<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <view class="select">
      <uni-data-select
        v-model="typeId"
        :localdata="tabslist"
        @change="change"
      ></uni-data-select>
    </view>
    <view class="slot">
      <u-upload
        :fileList="fileList1"
        @afterRead="afterRead"
        @delete="deletePic"
        name="1"
        multiple
        :maxCount="1"
      ></u-upload>
    </view>
  </view>
</template>

<script>
import request from "@/request/request.js";
export default {
  data() {
    return {
      fileList1: [],
      typeId: 0,
      tabslist: [],
    };
  },
  onLoad() {
    this.getRoomList();
  },
  methods: {
    change(e) {
      this.typeId = e;
      console.log("this.typeId", this.typeId);
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
    uploadFilePromise(url) {
      console.log(this.typeId + 0);
      console.log(url);
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "https://www.haorui.xyz/upload/image",
          filePath: url,
          name: "file",
          formData: {
            typeId: this.typeId + 0,
          },
          header: {
            "content-type": "application/json",
            Authorization: uni.getStorageSync("token"),
          },
          success: (res) => {
            res = JSON.parse(res.data);
            console.log(res);
            if (res.code == "00000") {
              this.showToast({
                type: "success",
                message: "上传成功",
                // url: "/pages/index/index",
              });
              setTimeout(() => {
                resolve(res);
              }, 1000);
            }
          },
        });
      });
    },

    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.select {
  width: 40vw;
  margin-top: 4vh;
  margin-bottom: 4vh;
}
</style>
