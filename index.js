'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var controllers = require('./src/controllers').controllers;

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});

    var pathname = url.parse(req.url).pathname;
    var urlInfos = explodeControllerAndAction(pathname);
    var controllerName = urlInfos[0] + '_controller';

    if(fs.existsSync('./src/controllers/' + controllerName + '.js')){
        if(typeof controllers[controllerName] != "undefined"){
            var action = urlInfos[1];
            var controller = new controllers[controllerName];

            if(typeof controller[action] != "undefined"){
                controller[action](function(data){
                    res.write(data.content);
                    res.end();
                });
            }
            else{
                generateNotFound(res, "L'action demandée " + action + " n'existe pas.");
                res.end();
            }
        }
        else{
            generateNotFound(res, "Le controller " + controllerName + ".js n'est pas enregistré dans index.js.");
            res.end();
        }
    }
    else{
        generateNotFound(res, "Le fichier " + controllerName + ".js n'existe pas.");
        res.end();
    }
});

server.listen(8888);

var generateNotFound = function(res, text){
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write(text);
}

var explodeControllerAndAction = function(pathname){
    return pathname.split('/').slice(1);
};