module.exports = async (args, db, openId, ctx) => {
  //获取openId
  let user = await db.collection("userList").doc(openId).get();
  if (user?.data) return user.data;
  //无此人,初次登录,注册一个人物,并返回res
  let data = {
    _id: openId,
    //头像
    headImg:
      "cloud://cloud1-6g40eg3bf2ebefcd.636c-cloud1-6g40eg3bf2ebefcd-1315571379/initHeadImg.png",
    name: "昵名A",
    share: 20, //贡献
    gold: 0, //金币
    score: 0, //信息
    level: 0, //等级
    ban: false, //禁用用户
  };
  await db.collection("userList").add({ data });
  return data;
};
