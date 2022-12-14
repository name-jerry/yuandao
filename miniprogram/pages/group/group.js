import { callCloud } from "../../common.js";
// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showLevel: false,
    showAge: false,
    groupId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.groupId) {
      console.log(options.groupId);
      this.setData({
        groupId: options.groupId,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  submit(e) {
    const data = e.detail.value;
    for (let key in data) {
      if (!data[key])
        return wx.showToast({
          title: "填写完整",
          icon: "error",
        });
    }
    if (data.level && !+data.level && +data.level != 0)
      return wx.showToast({
        title: "等级必须是数字",
        icon: "error",
      });
    if (data.age && !+data.age && +data.data != 0)
      return wx.showToast({
        title: "年龄必须是数字",
        icon: "error",
      });
    data.limit = {
      active: ~data.limit.indexOf("active"),
      level: data.level ?? 0,
      age: data.age ?? 0,
    };
    delete data.level;
    delete data.age;
    data.permission = !!+data.permission;
    console.log({ ...data });
    callCloud("createGroup", { ...data }).then(res => {
      console.log(res);
      let data = res.result;
      if (data.success) {
        wx.showToast({
          title: "成功",
          icon: "success",
        });
      } else {
        wx.showToast({
          title: "失败",
          icon: "error",
        });
      }
    });
  },
  chenckChange(e) {
    let limit = e.detail.value;
    this.setData({
      showLevel: ~limit.indexOf("level"),
      showAge: ~limit.indexOf("age"),
    });
  },
});
