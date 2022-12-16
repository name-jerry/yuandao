// 获取文件名
const files = require("./apis.js");
const cloud = require("wx-server-sdk");
let fun = {};
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
files.map(fileName => {
  const name = fileName.replace(".js", "");
  fun[name] = require("./functions/" + fileName);
});

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    if (typeof fun[event.api] !== "function") {
      throw new Error("No api");
    }
    return await fun[event.api](event.args, db, wxContext.OPENID, {
      cloud,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
