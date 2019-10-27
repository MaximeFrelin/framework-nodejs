import crypto from "crypto";

const algorithm = "sha256";
const encoding = "base64";

/**
 * Retourne un mot de passe haché
 * @param {string} password - Mot de passe à hacher
 * Retourne un objet contenant le salt et le password
 */
export function HashPassForBDD(password) {
  let salt = crypto.randomBytes(16).toString("hex");
  let encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
  return { encryptedPassword, salt };
}

export function HashPassForLogin(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
}
