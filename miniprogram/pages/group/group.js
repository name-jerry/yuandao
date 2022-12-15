import { callCloud, check, getDataLocallyOrCloud } from "../../common.js";
// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showLevel: false,
    showAge: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
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
    callCloud("createGroup", { ...data }).then(res => {
      check(res);
      if (res?.result?.success) {
        wx.showToast({
          title: "成功",
          icon: "success",
        });
        let groupId = res.result.data;
        getDataLocallyOrCloud("user").then(res => {
          let user = res?.result?.data || res;
          if (user) {
            user.groupList
              ? user.groupList.push(groupId)
              : (user.groupList = [groupId]);
            user.leaderGroup = groupId;
            wx.setStorageSync("user", user);
            wx.redirectTo({ url: "/pages/groupList/groupList?isMyGroup=true" });
          } else {
            wx.showToast({
              title: "服务器异常,请联系我们",
              icon: "error",
            });
          }
        });
      } else {
        wx.showToast({
          title: res?.result?.errorMessage || "未知错误",
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
