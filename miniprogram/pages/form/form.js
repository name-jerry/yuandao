import { callCloud, getDataLocallyOrCloud, check } from "../../common.js";
// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    oldUser: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let today = new Date().toISOString().split("T")[0];
    getDataLocallyOrCloud("user").then(res => {
      let user = res.result?.data || res;
      if (user) {
        this.setData({
          user: { ...user },
          oldUser: { ...user },
        });
      } else {
        wx.showToast({
          title: "网络异常",
          icon: "error",
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  submit(e) {
    // 表单验证
    const data = e.detail.value;
    for (const i in data) {
      if (i != "area" && !data[i]) {
        return wx.showToast({
          title: "请填写完整!",
          icon: "error",
          duration: 1500,
        });
      }
    }
    //判断是否有修改数据
    let isUpdate = false;
    for (const i in data) {
      if (i != "area" && data[i] != this.data.oldUser[i]) {
        isUpdate = true;
      } else if (i == "area") {
        data.area.map((value, index) => {
          if (this.data.user.area[index] != value) {
            return (isUpdate = true);
          }
        });
      }
    }
    if (!isUpdate)
      return wx.showToast({
        title: "成功",
        icon: "success",
        duration: 1000,
      });
    //上传更新
    callCloud("updateUser", this.data.user).then(res => {
      if (res?.result?.success) {
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 1000,
        });
        // 同步数据
        let newUser = this.data.user;
        wx.setStorageSync("user", newUser);
        this.setData({
          oldUser: { ...newUser },
        });
      } else {
        wx.showToast({
          title: "异常",
          icon: "errr",
          duration: 1000,
        });
      }
    });
  },
  reset() {
    this.setData({
      user: { ...this.data.oldUser },
    });
  },
  change(e) {
    const user = this.data.user;
    const type = e.target.dataset.type;
    user[type] = e.detail.value;
    this.setData({
      user,
    });
  },
  input(e) {
    const user = this.data.user;
    const type = e.target.dataset.type;
    user[type] = e.detail.value;
    this.setData({
      user,
    });
  },
});
