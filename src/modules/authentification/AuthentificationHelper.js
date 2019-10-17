import crypto from "crypto";

const algorithm = "sha256";
const encoding = "base64";

/**
 * Retourne un mot de passe haché
 * @param {string} password - Mot de passe à hacher
 */
export function HashPass(password) {
    password = password + Date.now(); //Ajout des millisecond depuis 01-01-1970
    return crypto.createHash(algorithm).update(password).digest(encoding);
}