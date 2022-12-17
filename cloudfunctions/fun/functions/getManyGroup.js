// 查询数据库集合云函数入口函数
module.exports = async (args, db, openId, ctx) => {
  const { isMyGroup } = args;
  const _ = db.command;
  let res;
  if (isMyGroup) {
    let user = await db.collection("userList").doc(openId).get();
    let groupList = user.data?.groupList;
    if (!groupList) return [];
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
  return [...res.data];
};
