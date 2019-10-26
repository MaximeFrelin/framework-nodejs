export default class CacheObject {
    Key;
    Value;
    CreationDate;

    constructor(key, value, creationDate) {
        this.Key = key;
        this.Value = value;
        this.CreationDate = creationDate;
    }
}