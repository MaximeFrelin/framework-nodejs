const DAO = require('./DAO');
const Comparator = require('../utils/ComparatorEnum');
const Query = require('./Query');

class AbstractTable{

    constructor(tableName, connexion){
        this.connexion = connexion;
        this.tableName = tableName;
        return this;
    }

}

AbstractTable.prototype.getRows = function(){
     
    return new Query("SELECT * FROM "+this.tableName, this.connexion, 'select');

}

AbstractTable.prototype.insert = function(){

    return new Query("INSERT INTO "+this.tableName, this.connexion, 'insert');

}





module.exports = AbstractTable;
