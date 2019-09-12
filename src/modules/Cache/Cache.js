import Config from "../../config/configuration"
import CacheObject from "./CacheObject"

let instance = null;
let cacheEntries = {};

class Cache {

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
            CheckObsoleteKey(cacheEntries)
        }, Config.cache.checkDelay);
    }

}

function CheckObsoleteKey(cacheEntries) {
    let keyToDelete = [];

    for (let key in cacheEntries) {
        if ((Date.now() - cacheEntries[key].CreationDate) >= Config.cache.duration)
            keyToDelete.push(cacheEntries[key].Key);
    }

    keyToDelete.forEach(key => {
        delete cacheEntries[key];
    });
}

export default function Instance() {
    if (!Config.cache.enable)
        throw error("Cache not enable");
    if (!instance) {
        instance = new Cache();
    }
    return instance;
};