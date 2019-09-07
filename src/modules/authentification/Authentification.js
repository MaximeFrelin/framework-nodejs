import { log } from "./decorator"

export default class Authentification {
    @log()
    testDecorator() {
        console.log("test decorator");
    }

    constructor() {
        console.log("construct");
    }
}