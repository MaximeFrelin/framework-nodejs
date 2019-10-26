import AuthentificationService from "./modules/authentification/AuthentificationService";
import fs from "fs";
import path from "path";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/configuration";
import url from "url";
import open from "open";
var controllers = require("./controllers").controllers;
var Html5Validator = require("html5-validator");

//Création du serveur express
const app = express();

const ROOT_PATH = __dirname;

//CONFIGURATION DU SERVEUR EXPRESS

app.use(cors());

app.use(express.static(__dirname + "/public/"));
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

//MIDDLEWARE CHECK CONTROLLER
app.use((req, res) => {
  var pathname = url.parse(req.url).pathname;
  var urlInfos = explodeControllerAndAction(pathname);
  var controllerName = urlInfos[0] + "_controller";

  /*
   * Code pour l'appel au Html5Validator
   */
  if (urlInfos[0] == "validator") {
    let parameters = url.parse(req.url, true).query;
    let urlViews = __dirname + "/views/" + parameters.controller + "/";

    fs.readFile(urlViews + parameters.action + ".html", function(err, data) {
      Html5Validator.validate(data.toString(), function(data) {
        let messages = [];
        for (let i in data.messages) {
          messages.push(data.messages[i].message);
        }

        if (messages.length == 0) {
          messages.push("No errors in your html file !");
        }

        if (fs.existsSync(urlViews + parameters.action + "_diag.html")) {
          fs.unlink(urlViews + parameters.action + "_diag.html", function() {
            fs.appendFile(
              urlViews + parameters.action + "_diag.html",
              messages,
              function(err) {
                if (err) console.log(err);
                else
                  open(urlViews + parameters.action + "_diag.html", "browser");
              }
            );
          });
        } else {
          fs.appendFile(
            urlViews + parameters.action + "_diag.html",
            data.data,
            function(err) {
              if (err) console.log(err);
              else open(urlViews + parameters.action + "_diag.html", "browser");
            }
          );
        }
      });
    });
  } else if (pathname.includes(".js")) {
    /*
     * Inclusion des fichiers javascript nécessaires dans le fichier html
     */
    fs.readFile(__dirname + pathname, function(err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data, "utf-8");
      res.end();
    });
  } else if (
    /*
     * Code pour retourner la page html demandée (vérification de l'existence du controller et de la page html)
     */
    fs.existsSync(__dirname + "/controllers/" + controllerName + ".js")
  ) {
    if (typeof controllers[controllerName] != "undefined") {
      var action = urlInfos[1];
      var controller = new controllers[controllerName]();

      if (typeof controller[action] != "undefined") {
        controller[action](req, function(data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data.content);
          res.end();
        });
      } else {
        generateNotFound(res, "L'action demandée " + action + " n'existe pas.");
        res.end();
      }
    } else {
      generateNotFound(
        res,
        "Le controller " +
          controllerName +
          ".js n'est pas enregistré dans index.js."
      );
      res.end();
    }
  } else {
    generateNotFound(res, "Le fichier " + controllerName + ".js n'existe pas.");
    res.end();
  }
});

app.use(cookieParser());

//REQUÊTE API

app.get("/", function(req, res) {
  new AuthentificationService().GenerateHashpassword(req, res);

  return res.end();
});

app.get("/loginPage", function(req, res) {
  return res.sendFile(path.join(__dirname, "./public/loginExample.html"));
});

app.post("/login", function(req, res) {
  new AuthentificationService().SignIn(req, res, "login", "pass");

  return res.end();
});

app.get("/logout", function(req, res) {
  new AuthentificationService().SignOut(req, res);

  return res.end();
});

function generateNotFound(res, text) {
  let responseText;

  if (config.debug) {
    responseText = text;
  } else {
    responseText =
      "<h1>404 Not Found</h1> <p>La page que vous demandez est introuvable.</p>";
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(responseText);
}

function explodeControllerAndAction(pathname) {
  return pathname.split("/").slice(1);
}

function getController(controllerName) {
  try {
    return require("./controllers/" + controllerName);
  } catch (e) {
    return undefined;
  }
}

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");

export { ROOT_PATH };
