export function log() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value; // save a reference to the original method

        // NOTE: Do not use arrow syntax here. Use a function expression in 
        // order to use the correct value of `this` in this method (see notes below)
        descriptor.value = function (...args) {
            // pre
            console.log("The method args are: " + JSON.stringify(args));
            // run and store result
            const result = originalMethod.apply(this, args);
            // post
            console.log("The return value is: " + result);
            // return the result of the original method (or modify it before returning)
            return result;
        };

        return descriptor;
    }
}

export function test() {
    return function (target, propertyKey, descriptor) {
        // console.log("test");
    }
}
