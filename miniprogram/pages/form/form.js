import { callCloud } from "../../common.js";
// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    age: "",
    area: [],
    openId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const updateUser = () => {
      console.log("this.data.user");
      let user = wx.getStorageSync("user");
      if (user) {
        this.setData({
          user: { ...user },
        });
      } else {
        callCloud("createUser").then(res => {
          let _ = res.result;
          if (_.success) {
            wx.setStorageSync("user", _.data);
            this.setData({
              user: _.data,
            });
          }
        });
      }
    };
    const types = { updateUser };
    let fn = types[options.type];
    fn && fn();
    !fn && console.log(options.type + "不存在");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  submit(e) {
    let _ = this.data;
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
    const age = new Date().getFullYear() - data.age.split("-")[0];
    if (_.groupId) {
      const groupId = parseInt(_.groupId);
      callCloud("joinGroup", { groupId }).then(res => {
        showSuccess(res);
      });
    } else {
      callCloud("createGroup", { ...data, age }).then(res => showSuccess(res));
    }
    function showSuccess(res) {
      console.log(res);
      if (res && res.result && res.result.success) {
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 1000,
        });
      } else {
        wx.showToast({
          title: res.result.errorMessage,
          icon: "error",
          duration: 1000,
        });
      }
    }
  },
  pickerChange(e) {
    const type = e.target.dataset.type;
    this.setData({
      [type]: e.detail.value,
    });
  },
});
