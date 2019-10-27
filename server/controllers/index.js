const fs = require("fs");

exports.controllers = {};

fs.readdir(__dirname + "/", (err, files) => {
  files.forEach(file => {
    if (file.includes("controller") && !file.includes(".map")) {
      var controller_name = file.split(".js")[0];
      exports.controllers[controller_name] = require(__dirname + "/" + file);
    }
  });
});
