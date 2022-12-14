const getOpenId = require("./getOpenId/index");
const createUser = require("./createUser/index");
const updateUser = require("./updateUser/index");
const createGroup = require("./createGroup/index");
const getManyGroup = require("./getManyGroup/index");
const joinGroup = require("./joinGroup/index");

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "getOpenId":
      return await getOpenId.main(event, context);
    case "createUser":
      return await createUser.main(event, context);
    case "updateUser":
      return await updateUser.main(event, context);
    case "createGroup":
      return await createGroup.main(event, context);
    case "getManyGroup":
      return await getManyGroup.main(event, context);
    case "joinGroup":
      return await joinGroup.main(event, context);
  }
};
