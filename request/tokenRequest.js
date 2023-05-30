const BASE_URL = "https://www.haorui.xyz";

const tokenRequest = (url, method, data, header = {}) => {
  return new Promise((resolve, reject) => {
    if (!uni.getStorageSync("token")) {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }

    uni.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: Object.assign(
        {
          "Content-Type": "application/json", // 默认请求头
          Authorization: uni.getStorageSync("token"),
        },
        header
      ),
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("请求失败"));
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};

export default tokenRequest;
