// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTANTS
const SERVICE_URL = "/user"

const RequestHandler = new RequestHandlerClass()

// USER SERVICE
class UserServiceClass {
    constructor() {}

    // Login User (GET /login/:email/:password)
    async login(email, password) {
        const loginURL = SERVICE_URL + `/login/${email}/${password}`

        return await RequestHandler.getDefault(loginURL)
    }

    // Register User (POST /register)
    async register(userData) {
        const registerURL = SERVICE_URL + `/register`

        return await RequestHandler.postDefault(registerURL, userData)
    }
}

export {UserServiceClass}