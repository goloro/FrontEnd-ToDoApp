// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTANTS
const SERVICE_URL = "/note"

const RequestHandler = new RequestHandlerClass()

// NOTE SERVICE
class NoteServiceClass {
    constructor() {}

    // Create Note (POST /create)
    async createNote(noteData) {
        const createNoteURL = SERVICE_URL + `/create`

        return await RequestHandler.postDefault(createNoteURL, noteData)
    }

    // Delete Note (DELETE /delete/:id)
    async deleteNote(id) {
        const deleteNoteURL = SERVICE_URL + `/delete/${id}`
    
        return await RequestHandler.deleteDefault(deleteNoteURL)
    }

    // Update Note (PUT /update/:id)
    async updateNote(id, noteData) {
        const updateNoteURL = SERVICE_URL + `/update/${id}`

        return await RequestHandler.putDefault(updateNoteURL, noteData)
    }

    // Get note by ID (GET /getById/:id)
    async getNoteById(id) {
        const getNoteByIdURL = SERVICE_URL + `/getById/${id}`

        return await RequestHandler.getDefault(getNoteByIdURL)
    }

    // Get notes of a user (GET /getByUser/:userId)
    async getNotesByUserId(userId) {
        const getNotesByUserIdURL = SERVICE_URL + `/getByUser/${userId}`

        return await RequestHandler.getDefault(getNotesByUserIdURL)
    }
}

export {NoteServiceClass}