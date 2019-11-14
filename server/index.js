import AuthentificationService from "./modules/authentification/AuthentificationService";
import path from "path";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { checkController } from "./control";
import bodyParser from "body-parser";
import { DAO } from "./modules/dao/DAO"
import { UserTable } from "./modules/dao/UserTable";


require("babel-core");
require("babel-polyfill");

//Création du serveur express
const app = express();

const ROOT_PATH = __dirname;

//CONFIGURATION DU SERVEUR EXPRESS

app.use(cors());
app.use(bodyParser.json());
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
app.use((req, res, next) => {
  //Si requête ajax, on continue on handle pas
  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    next();
  } else {
    checkController(res, req);
  }
});

app.use(cookieParser());

//REQUÊTE API

app.get("/", function(req, res) {});

app.post("/login", (req, res) => {
  let status = new AuthentificationService().SignIn(
    req,
    res,
    req.body.Login,
    req.body.Password
  );

  return res.json({ status: status });
});

app.get("/logout", (req, res) => {
  new AuthentificationService().SignOut(req, res);

  return res.end();
});


app.post("/dao_insert", (req, res) => {
  
  let dao =  new DAO({ id : 'root', ip: '127.0.0.1', pass : '', port: '80', db : 'framework'}).connect();
  
  console.log(dao);
  let table = new UserTable('user', dao);
  table.insert([req.body.userName, req.body.userFirstName, req.body.userAge, req.body.userMail], ["user_name", "user_firstname", "user_age", "user_mail"]);
  res.end();

});

app.get("/dao_select", (req, res) =>{

});

app.get("/dao_sorted_select", (req, res) => {

});

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");

export { ROOT_PATH };
