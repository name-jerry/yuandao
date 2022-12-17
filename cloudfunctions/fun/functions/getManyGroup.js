// 查询数据库集合云函数入口函数
module.exports = async (args, db, openId, ctx) => {
  const { isMyGroup } = args;
  const _ = db.command;
  let res;
  if (isMyGroup) {
    let userRes = await db.collection("userList").where({ openId }).get();
    let groupList =
      userRes && userRes.data && userRes.data[0] && userRes.data[0].groupList;
    if (!groupList)
      return {
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
    data: [...res.data],
  };
};
