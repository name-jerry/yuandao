const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let res = await db
      .collection("group")
      .where({ member: _.lt(6) })
      .orderBy("groupId", "asc")
      .get();
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
};
