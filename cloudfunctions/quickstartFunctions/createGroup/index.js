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
  //是否已经是队长
  let userRes = await db.collection("userList").where({ openId }).get();
  if (userRes?.data?.[0]?.leaderGroup)
    return {
      success: false,
      errorMessage: "已经创建过一个小组",
    };
  //获取小组id
  let res = await db.collection("groupList").count();
  let groupId = +res.total + 1;
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
  await db
    .collection("userList")
    .where({ openId })
    .update({
      data: {
        groupList: _.push([groupId]),
        leaderGroup: groupId,
      },
    });
  return {
    success: true,
    data: groupId,
  };
};
