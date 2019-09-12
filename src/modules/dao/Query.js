

class Query {

    constructor(str, con, type){
        
        this.type = type;
        this.query = str;
        this.connexion = con;
        return this;

    }

}


// Query.prototype.getColumnsNames = function(){

//     this.connexion.query('SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'Customers')

// }


Query.prototype.sqlQuery = function(callback){
    this.connexion.query(this.query, function (err, res) {
        if (err) 
            callback(err,null);
        else
            callback(null,res);

    });
}


Query.prototype.setResult = function(result){

    this.result = result;

}

Query.prototype.where = function(colonne, comparateur, valeur){
    if(this.type === 'select'){
        this.query += " WHERE " + colonne + comparateur + valeur;
        return this;
    }else{

        console.log('where ne peut être appelé qu\'après une instruction getRows ou .... ');

    }

}



Query.prototype.send = function(callback){
    
    console.log("sql querry sent : '"+this.query+"'");
    if(callback){
        this.sqlQuery(callback);
    }
    

    
}

module.exports = Query;
