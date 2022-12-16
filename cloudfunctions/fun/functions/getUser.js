exports.main = async (args, db, openId, ctx) => {
  //获取openId
  let d = await db.collection("userList").where({ openId }).get();
  //无此人,初次登录,注册一个人物,并返回res
  if (!d.data.length) {
    let data = {
      headImg:
        "cloud://cloud1-6g40eg3bf2ebefcd.636c-cloud1-6g40eg3bf2ebefcd-1315571379/initHeadImg.png",
      name: "昵名A",
      contribution: 1,
      gold: 1,
      score: 1,
      level: 1,
      openId,
    };
    await db.collection("userList").add({ data });
    return {
      success: true,
      data,
    };
  }
  //有此人返回数据
  return {
    success: true,
    data: d.data[0],
  };
};
