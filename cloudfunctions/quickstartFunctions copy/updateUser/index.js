const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
exports.main = async (event, context) => {
  //获取openId
  const user = event.data;
  const { headImg, name, sex, age, area, web, info } = user;
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  console.log(openId);
  let d = await db.collection("userList").where({ openId }).update({
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
  console.log(d);
  if (d.stats.updated)
    return {
      success: true,
    };

  //前端屏蔽了无更新得上传,如果还是出现updated为0时需检查
  return {
    success: false,
    errorMessage: "不应该存在得错误",
  };
};
