import { HashPass } from "./AuthentificationHelper";
import jwt from "jsonwebtoken";
import fs from "fs";

export default class AuthentificationService {
  constructor() {}

  get userId() {
    return {
      Login: "maxime",
      Password: "azerty"
    };
  }

  /**
   * Retourne le hash d'un password
   * @param {*} req
   * @param {*} res
   * @param {*} password
   */
  GetHashPassword(password) {
    return this.HashPassword(password);
  }

  /**
   * Log l'utilisateur, créer la session et le cookie
   * @param {*} req
   * @param {*} res
   * @param {*} login
   * @param {*} password
   */
  SignIn(req, res, login, password) {
    if (this.isInternalAccount(login, password)) {
      let secret = fs.readFileSync(
        __dirname + "/../../config/private.pem",
        "utf8"
      );
      const token = jwt.sign({ sub: 1 }, secret);
      res.cookie("SESSION_ID", token);
      req.session.SESSION_ID = token;

      res.redirect("/");
    }
  }

  /**
   * Vérifie le login mot de passe.
   * @param {*} login
   * @param {*} password
   */
  isInternalAccount(login, password) {
    // return (
    //   login == this.userId.Login &&
    //   // HashPass(password) HashPass(this.userId.Password)
    // );
  }

  /**
   * Déconnecte la session et supprime le cookie
   * @param {*} req
   * @param {*} res
   */
  SignOut(req, res) {
    req.session.destroy();
    res.clearCookie("SESSION_ID");
    res.redirect("/");
  }

  /**
   * Supprime le cookie
   * @param {*} req
   * @param {*} res
   */
  ClearCookie(res) {
    res.clearCookie("SESSION_ID");
  }

  /**
   * Vérifie si le cookie correspond à la session
   * @param {*} req - Resquest
   * @param {*} res - Response
   */
  CheckCookieAlive(req, res) {
    if (req.cookies.SESSION_ID && !req.session.SESSION_ID) {
      this.ClearCookie(res);
    }
  }

  //Todo: Supprimer
  @IsAuthorized()
  GenerateHashpassword(res) {
    res.status(200).end("OK");
  }
}

/**
 * Décorateur: Si l'utilisateur est connecté : redirige vers le controller sinon retourne 403
 */
function IsAuthorized() {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; //Sauvegarde de la fonction initial
    descriptor.value = function(...args) {
      if (args[0].session.SESSION_ID && args[0].cookies.SESSION_ID) {
        return originalMethod.apply(this, args);
      }

      args[1].status(403).redirect("/loginPage");
    };

    return descriptor;
  };
}
