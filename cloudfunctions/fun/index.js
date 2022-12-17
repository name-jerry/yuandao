// 获取文件名
const files = require("./apis.js");
const cloud = require("wx-server-sdk");
let fun = new Map();
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database({ throwOnNotFound: false });
files.map(fileName => {
  const name = fileName.replace(".js", "");
  fun.set(name, require("./functions/" + fileName));
});

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    if (typeof fun.get(event.api) !== "function") {
      throw new Error("No api");
    }
    const { data } = await fun.get(event.api)(
      event.args,
      db,
      wxContext.OPENID,
      {
        cloud,
        appId: wxContext.APPID,
        unionId: wxContext.UNIONID,
      }
    );
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
