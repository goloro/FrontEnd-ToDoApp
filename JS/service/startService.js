// IMPORTS
import { RequestHandlerClass } from "./requestHandler.js";

// CONSTANTS
const SERVICE_URL = "/start"

const RequestHandler = new RequestHandlerClass()

// START SERVICE
class StartServiceClass {
    constructor() {}

    async start() {
        return await RequestHandler.getDefault(SERVICE_URL, {});
    }
}

export { StartServiceClass }