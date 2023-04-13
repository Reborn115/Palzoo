<template>
  <view class="container">
    <view class="content">
      <uni-card :is-shadow="true">
        <uni-section title="编辑资料" type="line" titleFontSize="22px">
          <view class="example">
            <!-- 基础用法，不包含校验规则 -->
            <uni-forms
              ref="baseFormData"
              :modelValue="baseFormData"
              :rules="rules"
            >
              <uni-forms-item label="头像" name="headPic">
                <u-upload
                  :fileList="fileList1"
                  @afterRead="afterRead"
                  @delete="deletePic"
                  name="1"
                  multiple
                  :maxCount="1"
                ></u-upload>
              </uni-forms-item>
              <uni-forms-item label="姓名" required name="username">
                <uni-easyinput
                  v-model="baseFormData.username"
                  placeholder="请输入姓名"
                />
              </uni-forms-item>
              <uni-forms-item label="年龄" required name="age">
                <uni-data-select
                  v-model="baseFormData.age"
                  :localdata="age"
                  @change="change"
                ></uni-data-select>
              </uni-forms-item>
              <uni-forms-item label="性别" required name="sex">
                <uni-data-checkbox
                  v-model="baseFormData.sex"
                  :localdata="sex"
                ></uni-data-checkbox>
              </uni-forms-item>

              <uni-forms-item label="学院" required name="acaMajorId">
                <uni-data-select
                  v-model="baseFormData.acaMajorId"
                  :localdata="level"
                  @change="change"
                ></uni-data-select>
              </uni-forms-item>
              <uni-forms-item label="学校" required name="school">
                <uni-data-select
                  v-model="baseFormData.school"
                  :localdata="level"
                  @change="change"
                ></uni-data-select>
              </uni-forms-item>
              <uni-forms-item label="学号" required name="userId">
                <uni-easyinput
                  v-model="baseFormData.userId"
                  placeholder="请输入学号"
                />
              </uni-forms-item>
              <button type="primary" @click="submit('baseFormData')">
                提交
              </button>
            </uni-forms>
          </view>
        </uni-section>
      </uni-card>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      headPicUrl: "",
      baseFormData: {
        age: "",
        sex: "",
        username: "",
        acaMajorId: "",
        school: "",
        userId: "",
      },
      showForm: {
        show1: false,
        show2: false,
      },
      src: "https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg",
      fileList1: [],
      sex: [
        {
          text: "男",
          value: 0,
        },
        {
          text: "女",
          value: 1,
        },
      ],
      age: [
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
      ],
      level: [
        { value: "学龄前", text: "学龄前" },
        { value: "幼儿园", text: "幼儿园" },
        { value: "一年级", text: "一年级" },
        { value: "二年级", text: "二年级" },
        { value: "三年级", text: "三年级" },
        { value: "四年级", text: "四年级" },
        { value: "五年级", text: "五年级" },
        { value: "六年级", text: "六年级" },
        { value: "初一", text: "初一" },
        { value: "初二", text: "初二" },
        { value: "初三", text: "初三" },
        { value: "高一", text: "高一" },
        { value: "高二", text: "高二" },
        { value: "高三", text: "高三" },
      ],

      rules: {
        sign: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请填写个性签名",
            },
            {
              minLength: 1,
              maxLength: 20,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "个性签名",
          validateTrigger: "submit",
        },
        level: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请选择年级",
            },
          ],
          label: "年级",
          validateTrigger: "submit",
        },
        age: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请选择年龄",
            },
          ],
          label: "年龄",
          validateTrigger: "submit",
        },
        username: {
          //密码检验
          rules: [
            {
              required: true,
              errorMessage: "请填写籍贯",
            },
            {
              minLength: 2,
              maxLength: 12,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "籍贯",
          validateTrigger: "submit",
        },

        sex: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请选择性别",
            },
          ],
          label: "性别",
          validateTrigger: "submit",
        },
      },
    };
  },
  onLoad(e) {
    this.isCertification = uni.getStorageSync("isCertification");
  },
  methods: {
    close(order) {
      // console.log('close');
      this.showForm[`show${order}`] = false;
    },
    confirm1(order) {
      console.log("confirm", order);

      this.showForm.show1 = false;
      this.baseFormData.age = order.value[0];
    },
    confirm2(order) {
      console.log("confirm", order.indexs[0]);
      this.showForm.show2 = false;
      this.baseFormData.level = order.value[0];
    },
    cancel(order) {
      // console.log('cancel');
      this.showForm[`show${order}`] = false;
    },
    showPicker(order) {
      switch (order) {
        case 1:
          this.showForm.show1 = true;
          break;
        case 2:
          this.showForm.show2 = true;
          break;
        case 3:
          this.showForm.show3 = true;
          break;
        case 4:
          this.showForm.show4 = true;
          break;
        default:
          break;
      }
    },
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then(async (res) => {
          this.age = this.age - 0;
          this.baseFormData.age = parseInt(this.baseFormData.age);
          if (this.headPicUrl) {
            let data = this.baseFormData;
            console.log("data", data);
            const { data: res } = await request(
              "/control/user/info/update",
              "POST",
              data
            );
            console.log(res);
            console.log("success", res);
          } else {
            uni.showToast({
              title: `请上传头像`,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    change(e) {
      console.log("e:", e);
    },
    // 删除图片
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
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "https://www.haorui.xyz/control/user/info/updateAvatar", // 仅为示例，非真实的接口地址
          /* url: 'http://192.168.115.133:38088/api/upload', */
          filePath: url,
          name: "avator",
          formData: {
            openId: uni.getStorageSync("openid"),
          },
          header: {
            "content-type": "application/json",
          },
          success: (res) => {
            res = JSON.parse(res.data);
            console.log(res);
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-cell__title-text {
  font-size: 12px !important;
  color: #acacac !important;
}
::v-deep .uni-forms-item__label {
  width: 200rpx !important;
}
.example {
  margin-top: 30rpx;
}
::v-deep .uni-card {
  height: 100vh;
  padding-bottom: 20rpx;
}
.content {
  height: 100vh;
  padding-bottom: 80rpx;
}
</style>
