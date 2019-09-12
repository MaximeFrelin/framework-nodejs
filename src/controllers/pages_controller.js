'use strict';

var fs = require('fs');

var PagesController = class PagesController extends  {
    home(){
        fs.readFile("./src/views/pages/home", function (error, pgResp) {
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
            }

            resp.end();
        });
    }
}

module.exports = PagesController;