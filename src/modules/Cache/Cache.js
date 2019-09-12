import Config from "../../config/configuration"
import CacheObject from "./CacheObject"

let instance = null;
let cacheEntries = {};

class Cache {

    /**
     * Permet de récupèrer en cache une clé
     * Si elle n'existe pas, utilise la fonction de callback avec les paramètres pour la stocker dans le cache et la retourner 
     * @param {*} key 
     * @param {*} callback 
     * @param  {...any} args 
     */
    GetOrset(key, callback, ...args) {
        if (!(key in cacheEntries))
            cacheEntries[key] = new CacheObject(key, callback(...args), Date.now());
        return cacheEntries[key].Value;
    }

    Get(key) {
        return cacheEntries[key].Value;
    }

    Set(key, value) {
        if (!key in cacheEntries)
            cacheEntries[key] = value;
    }

    Remove(key) {
        delete cacheEntries[key];
    }

    WatchAll() {
        return cacheEntries;
    }

    constructor() {
        //Efface du cache les clés si elles sont périmées
        setInterval(() => {
            CheckObsoleteKey()
        }, Config.cache.checkDelay);
    }

}

/**
 * Vérifie les clés de cache qui sont périmées et les supprime
 */
function CheckObsoleteKey() {
    let keyToDelete = [];

    for (let key in cacheEntries) {
        if ((Date.now() - cacheEntries[key].CreationDate) >= Config.cache.duration)
            keyToDelete.push(cacheEntries[key].Key);
    }

    keyToDelete.forEach(key => {
        delete cacheEntries[key];
    });
}

/**
 * Récupère l'instance de cache
 */
export default function Instance() {
    if (!Config.cache.enable)
        throw error("Cache not enable");
    if (!instance) {
        instance = new Cache();
    }
    return instance;
};

/**
 * Decorateur pour sauvegarder le résultat d'une fonction dans le cache
 * @param {*} key - Clé qui sera sauvegarder dans le cache 
 */
export function SaveCache(key) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value; //Sauvegarde de la fonction initial

        descriptor.value = function (...args) {
            return Instance().GetOrset(key, originalMethod, ...args);
        };

        return descriptor;
    }
}