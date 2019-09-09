const fs = require('fs');

exports.controllers = {};

const testFolder = './src/controllers/';

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        if(file.includes('controller')){
            var controller_name = file.split('.js')[0];
            exports.controllers[controller_name] = require('./' + file);
        }
    });
});