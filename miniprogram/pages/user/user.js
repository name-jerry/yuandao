// pages/user/user.js
import { getDataLocallyOrCloud } from "../../common";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    infoList: [
      { name: "贡献", key: "contribution" },
      { name: "金币", key: "gold" },
      { name: "积分", key: "score" },
      { name: "等级", key: "level" },
    ],
    itemList: [
      { name: "奖励记录", url: "/pages/index/index" },
      { name: "邀请好友", url: "#" },
      { name: "我的消息", url: "#" },
      { name: "我的作业", url: "#" },
      { name: "我的提问", url: "#" },
      { name: "我的订单", url: "#" },
      { name: "小程序使用问题", url: "#" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    getDataLocallyOrCloud("user").then(res => {
      let user = res.result?.data || res;
      user
        ? this.setData({
            user,
          })
        : wx.showToast({
            title: "网络异常",
            icon: "error",
          });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
