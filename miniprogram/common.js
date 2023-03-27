function withLoading(fn) {
  function showLoading() {
    wx.showLoading({ mask: true });
  }
  function hideLoading() {
    wx.hideLoading();
  }
  function newFn(...args) {
    showLoading();
    const result = fn(...args);
    const isPromise = result instanceof Promise;
    if (!isPromise) {
      hideLoading();
      return result;
    } else {
      return result
        .then(res => {
          hideLoading();
          return res;
        })
        .catch(error => {
          hideLoading();
          console.log("withLoading", error);
        });
    }
  }
  return newFn;
}

const defaultOption = {
  name: "fun",
  data: {
    api: "",
    args: {},
  },
};
function callCloud(api, args = {}, isShowLoading = true) {
  defaultOption.data.api = api;
  defaultOption.data.args = args;
  try {
    if (isShowLoading) {
      return withLoading(wx.cloud.callFunction)(defaultOption);
    } else {
      return wx.cloud.callFunction(defaultOption);
    }
  } catch (error) {
    console.log(error.message);
  }
}
//根据key搜索缓存,缓存没有就去查询云端,云端有数据就返回并存入本地
function getDataLocallyOrCloud(key, isShowLoading) {
  return new Promise((resolve, reject) => {
    let value = wx.getStorageSync(key);
    if (value) {
      resolve(value);
    } else {
      let chats = [...key];
      chats[0] = chats[0].toUpperCase();
      let newKey = chats.join("");
      callCloud("get" + newKey, "", isShowLoading).then(res => {
        res.result.success && wx.setStorageSync(key, res.result.data);
        if (!res.result?.data) throw new Error("云端无返回");
        resolve(res);
      });
    }
  }).catch(error => {
    console.log(`getDataLocallyOrCloud(${key})函数错误:${error.message}`);
  });
}
function check(res) {
  if (!res) {
    console.log("网络问题");
  } else if (!res.result) {
    console.log("有返回result");
  } else if (!res.result.success) {
    if (res.result.success === undefined) return console.log("success未定义");
    if (res.result.errorMessage)
      return console.log("失败,错误信息为", res.result.errorMessage);
    console.log("失败,无错误信息");
  } else {
    console.log("成功,数据为", res.result.data);
  }
}

export { callCloud, withLoading, getDataLocallyOrCloud, check };
