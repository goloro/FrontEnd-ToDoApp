// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTANTS
const SERVICE_URL = "/task"

const RequestHandler = new RequestHandlerClass()

// TASK SERVICE
class TaskServiceClass {
    constructor() {}

    // Create task (POST /create)
    async createTask(taskData) {
        const createTaskURL = SERVICE_URL + `/create`
        return await RequestHandler.postDefault(createTaskURL, taskData)
    }

    // Update task (PUT /update/:id)
    async updateTask(id, taskData) {
        const updateTaskURL = SERVICE_URL + `/update/${id}`
        return await RequestHandler.putDefault(updateTaskURL, taskData)
    }

    // Delete task (DELETE /delete/:id/:projectId)
    async deleteTask(id, projectId) {
        const deleteTaskURL = SERVICE_URL + `/delete/${id}/${projectId}`
        return await RequestHandler.deleteDefault(deleteTaskURL)
    }

    // Get task by ID (GET /getById/:id)
    async getTaskById(id) {
        const getTaskByIdURL = SERVICE_URL + `/getById/${id}`
        return await RequestHandler.getDefault(getTaskByIdURL)
    }

    // Get tasks of a project (GET /getByProject/:projectId)
    async getTasksByProjectId(projectId) {
        const getTasksByProjectIdURL = SERVICE_URL + `/getByProject/${projectId}`
        return await RequestHandler.getDefault(getTasksByProjectIdURL)
    }

}

export {TaskServiceClass}