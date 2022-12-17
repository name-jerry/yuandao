module.exports = async (args, db, openId, ctx) => {
  //获取小组id
  let res = await db
    .collection("group")
    .where({
      groupId: args.groupId,
    })
    .get();
  if (res && res.data && res.data.length) {
    const g = res.data[0];
    if (g.member >= 5) {
      throw new Error("人数已满");
    }
    await db
      .collection("group")
      .where({
        groupId: args.groupId,
      })
      .update({
        data: {
          member: g.member + 1,
        },
      });
    await db.collection("form").add({
      data: {
        name: args.name,
        sex: args.sex,
        age: args.age,
        area: args.area,
        tel: args.tel,
        info: args.info,
        isLeader: false,
        groupId: args.groupId,
        openId,
      },
    });
    return {
      data: {},
    };
  }
  throw new Error("无该小组");
};
