// pages/form/form.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    age: "",
    area: ["广东省", "广州市", "海珠区"],
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
    console.log(e.detail.value);
  },
  pickerChange(e) {
    const type = e.target.type;
    this.setData({
      [type]: e.detail.value,
    });
  },
});
