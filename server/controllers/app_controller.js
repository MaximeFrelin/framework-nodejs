"use strict";

import fs from "fs";
import path from "path";
import { ROOT_PATH } from "../index";

var AppController = class AppController {
  constructor() {}

  render(page, callback) {
    fs.readFile(this.htmlPath(page), function(error, pgResp) {
      var data = {
        error: false,
        content: pgResp
      };

      if (error) {
        data.error = true;
      }

      callback(data);
    });
  }

  get htmlPath() {
    return page => {
      return path.join(ROOT_PATH, "views", page + ".html");
    };
  }
};

module.exports = AppController;
