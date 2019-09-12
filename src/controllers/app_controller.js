'use strict';

var fs = require('fs');

var AppController = class AppController{
    constructor(){

    };

    render(page, callback) {
        fs.readFile("./src/views/" + page + ".html", function (error, pgResp) {
            var data = {
                error: false,
                content: pgResp
            };

            if(error){
                data.error = true;
            }

            callback(data);
        });
    }
}

module.exports = AppController;