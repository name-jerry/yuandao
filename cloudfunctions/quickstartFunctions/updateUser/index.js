const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
exports.main = async (event, context) => {
  //获取openId
  const u = event.data;
  const { name, type, permission, limit, info } = u;
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  //获取小组id
  let d = await db.collection("userList").where({ openId }).get();
  if (!d.data.length) {
    return {
      success: false,
      errorMessage: "不存在",
    };
  } else {
    await db
      .collection("userList")
      .where({
        openId,
      })
      .update({
        data: {},
      });
    return {
      success: true,
    };
  }
};
