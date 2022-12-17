// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      // 在开发和体验环境中自动切换
      let info = wx.getAccountInfoSync();
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env:
          info.miniProgram.envVersion === "release"
            ? "cloud1-6g40eg3bf2ebefcd"
            : "test-4gih6w1067206d52",
        traceUser: true,
      });
    }
    // 强制更新
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    });
  },
  globalData: {},
});
