module.exports = async (args, db, openId, ctx) => {
  const _ = db.command;
  //获取小组id
  let res = await db
    .collection("groupList")
    .where({
      groupId: args.groupId,
    })
    .get();
  const g = res?.data?.[0];

  if (!g) {
    throw new Error("小组不存在");
  } else if (g.member >= 5) {
    throw new Error("人数已满");
  }
  // 修改小组
  await db
    .collection("groupList")
    .where({
      groupId: args.groupId,
    })
    .update({
      data: {
        member: g.member + 1,
      },
    });
  // 修改人物
  await db
    .collection("userList")
    .doc(openId)
    .add({
      data: {
        groupList: _.push([args.groupId]),
      },
    });
  return;
};
