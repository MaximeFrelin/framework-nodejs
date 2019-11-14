"use strict";

var AppController = require("./app_controller.js");
import { IsAuthorized } from "../modules/authentification/AuthentificationService";

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

  template(req, res, callback) {
    this.render("pages/template", function(data) {
      callback(data);
    });
  }
};

module.exports = PagesController;
