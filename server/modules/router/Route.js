export default class Route {

    constructor(path, callback) {
        this.controller = this.splitPath(path).controller;
        this.action = this.splitPath(path).action;
        this.callback = callback;
    }

    splitPath(path) {
        let splitPath = path.split('/');

        return {
            controller: splitPath[1],
            action: splitPath[2]
        };
    }

    call() {
        this.callback();
    }
}