const DAO = require('./DAO');
const Comparator = require('../../utils/ComparatorEnum');
const Query = require('./Query');

export class AbstractTable {

    constructor(tableName, connexion) {
        this.connexion = connexion;
        this.tableName = tableName;
        this.columns = [];

        return this;
    }


    setColumnsNamesFromDB(callback) {
        console.log(this.connexion);
        this.connexion.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" + this.tableName + "' AND TABLE_SCHEMA = '" + this.connexion.config.database + "'", function (err, res) {

            if (err) {
                console.log(err);
            } else {

                var columns = [];

                for (var i = 0; i < res.length; i++) {

                    columns.push(res[i].COLUMN_NAME);

                }

                callback(columns);

            }

        }.bind(this));

    }


    getRows() {

        return new Query("SELECT * FROM " + this.tableName, this.connexion, 'select');

    }


    insert(v, c) {

        this.setColumnsNamesFromDB(function (columns) {

            console.log(columns);

            c = (!c) ? columns : c;
            console.log(c);
            if (arrayContainsArray(columns, c) && c.length == v.length) {
                var query = "INSERT INTO " + this.tableName + " (";
                for (var i = 0; i < c.length; i++) {

                    query += c[i];
                    if (i < c.length - 1) {
                        query += ',';
                    }

                }
                query += ' ) VALUES (';

                for (var i = 0; i < v.length; i++) {
                    console.log(typeof v[i]);
                    if (typeof v[i] === 'string') {

                        query += "'" + v[i] + "'";
                        if (i < c.length - 1) {
                            query += ',';
                        }
                    } else if (typeof v[i] == 'number') {
                        query += v[i];
                        if (i < c.length - 1) {
                            query += ',';
                        }
                    }

                }
                query += ' )';

            } else if (arrayContainsArray(columns, c)) {

                console.log('le nombre de valeur ne correpond pas au nombre de colonne à remplir pour la nouvelle ligne de la table');

            } else {

                console.log('mauvais nom de colonne');

            }


            new Query(query, this.connexion, 'insert').send(function (err, data) {

                console.log(data);

            });

        }.bind(this));

    }

    delete() {

        return new Query("DELETE FROM " + this.tableName, this.connexion, 'delete');

    }

}


function arrayContainsArray(superset, subset) {
    if (0 === subset.length) {
        return false;
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
}
