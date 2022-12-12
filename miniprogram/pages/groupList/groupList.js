import { callCloud } from "../../common.js";
// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    groupList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    callCloud("getManyGroup").then(res => {
      const d = res.result;
      if (d.success) {
        this.setData({
          groupList: d.data,
        });
      } else {
        wx.showToast({
          title: d.errorMessage,
          icon: "error",
          duration: 1500,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
});
