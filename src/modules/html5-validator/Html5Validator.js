var htmlValidator = require('html-validator');

class Html5Validator {
    static validate(sources, callback) {
        (async () => {
            const options = {
                url: 'https://validator.w3.org/nu/',
                format: 'json',
                data: sources
            };

            try {
                const result = await htmlValidator(options);
                callback(result);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}

module.exports = Html5Validator;