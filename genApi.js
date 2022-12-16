const fs = require("fs");
// 输入路径读取该路径下的文件名(-dirname为本文件所路径)
let files = fs.readdirSync(__dirname + "/cloudfunctions/fun/functions");
// 写入一个文件,第一个参数为文件所在路径+文件名,第二参数为内容
fs.writeFileSync(
  __dirname + "/cloudfunctions/fun/apis.js",
  "module.exports=" + JSON.stringify(files)
);
