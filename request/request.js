// const BASE_URL = "http://43.143.162.177:11500";
// const BASE_URL = "https://www.haorui.xyz";
const BASE_URL = "https://www.haorui.xyz";

const request = (url, method, data, header = {}) => {
  return new Promise((resolve, reject) => {
    // console.log("openid", uni.getStorageSync("openid"));
    if (
      url != "/show/rooms" &&
      url != "/sign/in" &&
      url != "/login" &&
      url != "/map/queue" &&
      url != "/broadcast/show" &&
      url != "/list/type"
    ) {
      if (!uni.getStorageSync("openid")) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      }
    }
    uni.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: Object.assign(
        {
          "Content-Type": "application/json", // 默认请求头
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

export default request;
