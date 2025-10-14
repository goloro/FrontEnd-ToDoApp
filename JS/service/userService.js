// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTANTS
const SERVICE_URL = "/user"

const RequestHandler = new RequestHandlerClass()

// USER SERVICE
class UserServiceClass {
    constructor() {}

    // Login User (GET /login?email=<email>&password=<password>)
    async login(email, password) {
        const loginURL = SERVICE_URL + `/login?email=${email}&password=${password}`

        return await RequestHandler.getDefault(loginURL)
    }

    // Update User (PUT /update/:id)
    async updateUser(id, userData) {
        const updateUserURL = SERVICE_URL + `/update/${id}`

        return await RequestHandler.putDefault(updateUserURL, userData)
    }

    // Delete User (DELETE /delete/:id)
    async deleteUser(id) {
        const deleteUserURL = SERVICE_URL + `/delete/${id}`

        return await RequestHandler.deleteDefault(deleteUserURL)
    }

    // Get By Id (GET /getById/:id)
    async getById(id) {
        const getByIdURL = SERVICE_URL + `/getById/${id}`

        return await RequestHandler.getDefault(getByIdURL)
    }

    // Get By Email (GET /getByEmail/:email)
    async getByEmail(email) {
        const getByEmailURL = SERVICE_URL + `/getByEmail/${email}`

        return await RequestHandler.getDefault(getByEmailURL)
    }

    // Register User (POST /register)
    async signUp(userData) {
        const registerURL = SERVICE_URL + `/register`

        return await RequestHandler.postDefault(registerURL, userData)
    }
}

export {UserServiceClass}