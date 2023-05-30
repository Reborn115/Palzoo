<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <view class="title"> 点击下方上传图片</view>
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
export default {
  data() {
    return {
      fileList1: [],
    };
  },
  methods: {
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
      console.log(url);
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "https://www.haorui.xyz/map/upload",
          filePath: url,
          name: "file",
          formData: {},
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
.title {
  font-weight: bold;
  font-size: 18px;
  margin-top: 5vh;
  margin-bottom: 3vh;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
