var fs = require('fs');

export default class Reader {

    static read(filename) {
        let type;

        switch(filename.split('.')[1]) {
            case 'css':
                type = 'css';
                break;
            case 'js':
                type = 'js';
                break;
            default:
                type = 'img';
                break;
        }

        fs.readFile('./src/assets/' + type + '/' + filename.split('.')[1] + '/' + filename, function (err, data) {
            if(!err)
                callback(data);
        });
    }

}