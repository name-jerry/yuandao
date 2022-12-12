const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  //获取openId
  const u = event.data;
  console.log(u);
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  //获取小组id
  let res = await db.collection("group").count();
  let groupId = parseInt(res.total) + 1;
  await db.collection("group").add({
    // data 字段表示需新增的 JSON 数据
    data: {
      name: u.name,
      sex: u.sex,
      age: u.age,
      area: u.area,
      tel: u.tel,
      info: u.info,
      member: 1,
      openId,
      groupId,
    },
  });
  await db.collection("form").add({
    // data 字段表示需新增的 JSON 数据
    data: {
      name: u.name,
      sex: u.sex,
      age: u.age,
      area: u.area,
      tel: u.tel,
      info: u.info,
      isLeader: true,
      openId,
      groupId,
    },
  });

  return {
    success: true,
  };
};
