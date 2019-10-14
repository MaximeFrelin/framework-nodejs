'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var open = require('open');
require('babel-polyfill');

var controllers = require('./controllers').controllers;
var config = require('./config/configuration');
var Html5Validator = require('./modules/html5-validator/Html5Validator');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var urlInfos = explodeControllerAndAction(pathname);
    var controllerName = urlInfos[0] + '_controller';

    /*
     * Code pour l'appel au Html5Validator
     */
    if(urlInfos[0] == 'validator'){
        let parameters = url.parse(req.url, true).query;
        let urlViews = __dirname + '/views/' + parameters.controller + '/';

        fs.readFile(urlViews + parameters.action + '.html', function (err, data) {
            Html5Validator.validate(data.toString(), function(data) {
                console.log(data);
                let messages = [];
                for(let i in data.messages) {
                    messages.push(data.messages[i].message);
                }

                if(messages.length == 0) {
                    messages.push("No errors in your html file !");
                }

                if(fs.existsSync(urlViews + parameters.action + '_diag.html')) {
                    fs.unlink(urlViews + parameters.action + '_diag.html', function(){
                        fs.appendFile(urlViews + parameters.action + '_diag.html', messages, function (err) {
                            if(err)
                                console.log(err);
                            else
                                open(urlViews + parameters.action + '_diag.html', 'browser');
                        });
                    });
                }
                else{
                    fs.appendFile(urlViews + parameters.action + '_diag.html', data.data, function (err) {
                        if(err)
                            console.log(err);
                        else
                            open(urlViews + parameters.action + '_diag.html', 'browser');
                    });
                }
            });
        });
    }
    /*
     * Inclusion des fichiers javascript nécessaires dans le fichier html
     */
    else if(pathname.includes('.js')){
        fs.readFile(__dirname + pathname, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data, 'utf-8');
            res.end();
        });
    }
    /*
     * Code pour retourner la page html demandée (vérification de l'existence du controller et de la page html)
     */
    else if(fs.existsSync(__dirname + '/controllers/' + controllerName + '.js')){
        if(typeof controllers[controllerName] != "undefined"){
            var action = urlInfos[1];
            var controller = new controllers[controllerName];

            if(typeof controller[action] != "undefined"){
                controller[action](req, function(data){
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