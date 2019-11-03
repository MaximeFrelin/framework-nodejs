import { HashPassForLogin } from "./AuthentificationHelper";
import jwt from "jsonwebtoken";
import fs from "fs";

export default class AuthentificationService {
  constructor() {}

  get users() {
    return [
      {
        Salt: "GPhsCjUwkRxmtRv2IEx8",
        Login: "maxime",
        Password: "azerty"
      }
    ];
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
      return true;
    } else {
      return false;
    }
  }

  /**
   * Vérifie le login mot de passe.
   * @param {*} login
   * @param {*} password
   */
  isInternalAccount(login, password) {
    let userToTest = this.users.find(u => u.Login == login);
    if (userToTest) {
      return (
        HashPassForLogin(password, userToTest.Salt) ==
        HashPassForLogin(userToTest.Password, userToTest.Salt)
      );
    } else {
      return false;
    }
  }

  /**
   * Déconnecte la session et supprime le cookie
   * @param {*} req
   * @param {*} res
   */
  SignOut(req, res) {
    req.session.destroy();
    res.clearCookie("SESSION_ID");
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
export function IsAuthorized() {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; //Sauvegarde de la fonction initial
    descriptor.value = function(...args) {
      if (args[0].session.SESSION_ID && args[0].cookies.SESSION_ID) {
        return originalMethod.apply(this, args);
      }

      args[1].writeHead(403, {
        "Content-Type": "text/html;  charset=utf-8"
      });
      args[1].write(
        "<h1>403 Non autorisé</h1> <p>Vous ne disposez pas des autorisations nécessaires</p>"
      );
      args[1].end();
    };

    return descriptor;
  };
}
