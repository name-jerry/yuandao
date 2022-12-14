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
  let res = await db.collection("groupList").count();
  let groupId = parseInt(res.total) + 1;
  await db.collection("groupList").add({
    data: {
      name,
      type,
      permission,
      limit,
      info,
      member: 1,
      openId,
      groupId,
    },
  });
  return {
    success: true,
  };
};
