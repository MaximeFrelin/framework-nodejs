'use strict';

var AppController = require('./app_controller.js');

var PagesController = class PagesController extends AppController {
    home(callback){
        this.render('pages/home', function(data){
            callback(data);
        });
    }
}

module.exports = PagesController;