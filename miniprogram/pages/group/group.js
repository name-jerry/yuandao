import { callCloud } from "../../common.js";
// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    age: "",
    area: [],
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
    console.log(e.detail.value);
    const data = e.detail.value;
  },
  pickerChange(e) {
    const type = e.target.dataset.type;
    this.setData({
      [type]: e.detail.value,
    });
  },
});
