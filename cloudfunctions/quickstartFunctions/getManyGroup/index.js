const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const { isMyGroup } = event.data;
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  let res;
  if (isMyGroup) {
    let userRes = await db.collection("userList").where({ openId }).get();
    let groupList =
      userRes && userRes.data && userRes.data[0] && userRes.data[0].groupList;
    if (!groupList)
      return {
        success: true,
        data: [],
      };
    console.log("0");
    res = await db
      .collection("groupList")
      .where({ groupId: _.in(groupList) })
      .orderBy("groupId", "asc")
      .get();
    console.log("1");
  } else {
    res = await db
      .collection("groupList")
      .where({ member: _.lt(6) })
      .orderBy("groupId", "asc")
      .get();
  }
  return {
    success: true,
    data: [...res.data],
  };
};
