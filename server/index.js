import AuthentificationService from "./modules/authentification/AuthentificationService";
import Cache from "./modules/Cache/Cache";
import fs from "fs";
import jwt from "jsonwebtoken";
import { endianness } from "os";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const path = require("path");
const http = require("http");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("../webpack.server.config.js");

const app = express();
const compiler = webpack(config);

app.options("*", cors());

app.use(cors());

app.use(express.static(__dirname + "/../public/"));
app.use(
  session({
    cookieName: "session",
    secret: "eg[isfd-8yF9-7w2315df{}+Ijsli;;to8",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  new AuthentificationService().CheckCookieAlive(req, res);
  next();
});

app.use(cookieParser());

app.get("/", function(req, res) {
  new AuthentificationService().GenerateHashpassword(req, res);

  return res.end();
});

app.get("/loginPage", function(req, res) {
  return res.sendFile(path.join(__dirname, "../public/loginExample.html"));
});

app.post("/login", function(req, res) {
  new AuthentificationService().SignIn(req, res, "login", "pass");

  return res.end();
});

app.get("/logout", function(req, res) {
  new AuthentificationService().SignOut(req, res);

  return res.end();
});

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");
