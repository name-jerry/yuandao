const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
exports.main = async (event, context) => {
  //获取openId
  const u = event.data;
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  //获取小组id
  let res = await db
    .collection("group")
    .where({
      groupId: u.groupId,
    })
    .get();
  if (res && res.data && res.data.length) {
    const g = res.data[0];
    if (g.member >= 5) {
      return {
        success: false,
        errorMessage: "人数已满",
      };
    }
    await db
      .collection("group")
      .where({
        groupId: u.groupId,
      })
      .update({
        data: {
          member: g.member + 1,
        },
      });
    await db.collection("form").add({
      data: {
        name: u.name,
        sex: u.sex,
        age: u.age,
        area: u.area,
        tel: u.tel,
        info: u.info,
        isLeader: false,
        groupId: u.groupId,
        openId,
      },
    });
    return {
      success: true,
    };
  }
  return {
    success: false,
    errorMessage: "无该小组",
  };
};
