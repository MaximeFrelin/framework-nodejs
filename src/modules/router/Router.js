import Route from './Route';

export default class Router {

    constructor() {

    }

    get(path) {
        let route = new Route(path, callback);
        route.call();
    }

}