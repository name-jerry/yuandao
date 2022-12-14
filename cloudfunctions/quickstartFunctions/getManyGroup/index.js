const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const { isMyGroup } = event.data;
  const getManyGroup = async fn => {
    try {
      let res = await fn();
      console.log("0");
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: error,
      };
    }
  };
  let res;
  if (isMyGroup) {
    res = await getManyGroup(() =>
      db
        .collection("groupList")
        .where({ member: _.lt(6) })
        .orderBy("groupId", "asc")
        .get()
    );
  } else {
    res = await getManyGroup(() =>
      db
        .collection("groupList")
        .where({ member: _.lt(6) })
        .orderBy("groupId", "asc")
        .get()
    );
  }
  return {
    ...res,
  };
};
