"use strict";

var AppController = require("./app_controller.js");
import { IsAuthorized } from "../modules/authentification/AuthentificationService";
import { isUserWhitespacable } from "@babel/types";

var PagesController = class PagesController extends AppController {
  @IsAuthorized()
  home(req, res, callback) {
    this.render("pages/home", function(data) {
      callback(data);
    });
  }

  login(req, res, callback) {
    this.render("pages/login", function(data) {
      callback(data);
    });
  }

  dao(req, res, callback) {
    this.render("pages/dao", function(data) {
      callback(data);
    });
  }

  
};

module.exports = PagesController;
