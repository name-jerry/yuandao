module.exports = async (args, db, openId, ctx) => {
  const { headImg, name, sex, age, area, web, info } = args;
  let d = await db.collection("userList").doc(openId).update({
    data: {
      headImg,
      name,
      sex,
      age,
      area,
      web,
      info,
    },
  });
  if (d.stats.updated) return;

  //前端屏蔽了无更新得上传,如果还是出现updated为0时需检查
  throw new Error("不应该存在得错误");
};
