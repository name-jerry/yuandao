module.exports = async (args, db, openId, ctx) => {
  const _ = db.command;
  const { name, type, permission, limit, info } = args;
  //是否已经是队长
  let user = await db.collection("userList").doc(openId).get();
  if (user.data?.leaderGroup) throw new Error("已经创建过一个小组");
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
    .doc(openId)
    .update({
      data: {
        groupList: _.push([groupId]),
        leaderGroup: groupId,
      },
    });
  return groupId;
};
