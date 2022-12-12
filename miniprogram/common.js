function withLoading(fn) {
  function showLoading() {
    wx.showLoading();
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
          throw error;
        });
    }
  }
  return newFn;
}

const defaultOption = {
  name: "quickstartFunctions",
  data: {
    type: "createGroup",
    data: {},
  },
};
function callCloud(type, data) {
  defaultOption.data.type = type;
  defaultOption.data.data = data || "";
  return withLoading(wx.cloud.callFunction)(defaultOption);
}

export { callCloud, withLoading };
