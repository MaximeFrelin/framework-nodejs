'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var controllers = require('./src/controllers').controllers;

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var urlInfos = explodeControllerAndAction(pathname);
    var controllerName = urlInfos[0] + '_controller';

    if(fs.existsSync('./src/controllers/' + controllerName + '.js')){
        if(typeof controllers[controllerName] != "undefined"){
            res.writeHead(200, {"Content-Type": "text/html"});
        }
        else{
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write("Le controller " + controllerName + ".js n'est pas enregistré dans index.js.");
        }
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("Le fichier " + controllerName + ".js n'existe pas.");
    }

    res.end();
});

server.listen(3000);

process.once('SIGUSR2', function () {
    server.close(function () {
        process.kill(process.pid, 'SIGUSR2')
    })
});

var explodeControllerAndAction = function(pathname){
    return pathname.split('/').slice(1);
};