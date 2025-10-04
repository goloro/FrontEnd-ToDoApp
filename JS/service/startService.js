// IMPORTS
import { RequestHandlerClass } from "./requestHandler";

// CONSTANTS
const SERVICE_URL = "/start"

const RequestHandler = new RequestHandlerClass()

// START SERVICE
class StartServiceClass {
    constructor() {}

    async start() {
        return await RequestHandler.post(SERVICE_URL, {});
    }
}

export { StartServiceClass }