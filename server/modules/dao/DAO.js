const mysql = require('mysql');

export class DAO {
    constructor(conf) {
        this.ip = conf.ip;
        this.id = conf.id;
        this.pass = conf.pass;
        this.port = conf.port;
        this.db = conf.db;
    }
}

DAO.prototype.connect = function () {

    console.log('Get connection ...');

    this.connexion = mysql.createConnection({
        database: this.db,
        host: this.ip,
        user: this.id,
        password: this.pass
    });

    this.connexion.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    return this.connexion;

}
