

class Query {

    constructor(str, con, type){
        
        this.type = type;
        this.query = str;
        this.connexion = con;
        this.lastInstruction;
        return this;

    }


    sqlQuery(callback){
        this.connexion.query(this.query, function (err, res) {
            if (err) 
                callback(err,null);
            else
                callback(null,res);
    
        });
    }


    where(colonne, comparateur, valeur){
        if(this.type === 'select' || this.type === 'delete' && this.lastInstruction != "where" && this.lastInstruction != "sort" ){
            this.query += " WHERE " + colonne + " " + comparateur + " '" + valeur + "'";
            this.lastInstruction = 'where';
            return this;
        }else{
    
            console.log('where ne peut être appelé qu\'après une instruction getRows ou .... ');
    
        }
    
    }


    send(callback){
    
        console.log("sql querry sent : '"+this.query+"'");
        if(callback){
            this.sqlQuery(callback);
        }
        
    }

    sort(colonne, sens){

        if(this.type === 'select' && this.lastInstruction != "sort"){

            this.lastInstruction = 'sort';
            this.query += ' ORDER BY ';

            if(colonne.constructor === Array && sens.constructor === Array && colonne.length === sens.length){

                for(var i = 0; i < colonne.length; i++){

                    this.query += colonne[i] + ' ' + sens[i];

                    if(i < colonne.length-1){

                        this.query += ", ";

                    }

                }

            }else if(colonne.constructor === String && sens.constructor === String){

                this.query += colonne + ' ' + sens;

            }

            return this;

        }else{

            console.log('mauvaise utilisation du sort');

        }
    }


    or(colonne, comparateur, valeur){

        if(this.lastInstruction == "where" || this.lastInstruction == "or" || this.lastInstruction == "and"){

            this.query +=  " OR "+colonne+" "+comparateur+" '"+valeur+"'";
            this.lastInstruction = "or";

            return this;
        }

    }

    and(colonne, comparateur, valeur){

        if(this.lastInstruction == "where" || this.lastInstruction == "or" || this.lastInstruction == "and"){

            this.query +=  " AND "+colonne+" "+comparateur+" '"+valeur+"'";
            this.lastInstruction = "and";

            return this;

        }

    }

}


// Query.prototype.getColumnsNames = function(){

//     this.connexion.query('SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'Customers')

// }




// Query.prototype.setResult = function(result){

//     this.result = result;

// }


module.exports = Query;
