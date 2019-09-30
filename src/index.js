'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var controllers = require('./controllers').controllers;
var config = require('./config/configuration');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var urlInfos = explodeControllerAndAction(pathname);
    var controllerName = urlInfos[0] + '_controller';

    if(fs.existsSync(__dirname + '/controllers/' + controllerName + '.js')){
        if(typeof controllers[controllerName] != "undefined"){
            var action = urlInfos[1];
            var controller = new controllers[controllerName];

            if(typeof controller[action] != "undefined"){
                controller[action](function(data){
                    res.writeHead(200, {"Content-Type": "text/html"});
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
    let responseText;

    if(config.debug) {
        responseText = text;
    }
    else {
        responseText = '<h1>404 Not Found</h1> <p>La page que vous demandez est introuvable.</p>';
    }

    res.writeHead(404, {"Content-Type": "text/html"});
    res.write(responseText);
}

var explodeControllerAndAction = function(pathname){
    return pathname.split('/').slice(1);
};