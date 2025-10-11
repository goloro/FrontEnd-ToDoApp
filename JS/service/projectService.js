// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTANTS
const SERVICE_URL = "/project"

const RequestHandler = new RequestHandlerClass()

// PROJECT SERVICE
class ProjectServiceClass {
    constructor() {}

    // Create Project (POST /create)
    async createProject(projectData) {
        const createProjectURL = SERVICE_URL + `/create`
        return await RequestHandler.postDefault(createProjectURL, projectData)
    }

    // Update Project (PUT /update/:id)
    async updateProject(id, projectData) {
        const updateProjectURL = SERVICE_URL + `/update/${id}`
        return await RequestHandler.putDefault(updateProjectURL, projectData)
    }

    // Delete Project (DELETE /delete/:id)
    async deleteProject(id) {
        const deleteProjectURL = SERVICE_URL + `/delete/${id}`
        return await RequestHandler.deleteDefault(deleteProjectURL)
    }

    // Get project by ID (GET /getById/:id)
    async getProjectById(id) {
        const getProjectByIdURL = SERVICE_URL + `/getById/${id}`
        return await RequestHandler.getDefault(getProjectByIdURL)
    }

    // Get projects of a user (GET /getByUserId/:userId)
    async getProjectsByUserId(userId) {
        const getProjectsByUserIdURL = SERVICE_URL + `/getByUserId/${userId}`
        return await RequestHandler.getDefault(getProjectsByUserIdURL)
    }

}

export {ProjectServiceClass}