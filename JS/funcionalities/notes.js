// IMPORTS
import { NoteServiceClass } from "../service/noteService.js"
import { AlertsClass } from "../utils/alerts.js"

// CONSTANTS
// Service
const noteService = new NoteServiceClass()

// User
const user = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

// Buttons
const createNoteBtn = document.getElementById("createNoteButton")

// Text
const noNotesText = document.getElementById("noNotesText")

// Containers
const notesSubContainer = document.getElementById("notesSubContainer")

// VARIABLES
let notesIds = []
let noteEmpty = { exists: false, id: null }

// LOAD NOTES
await loadNotesBBDD()

// EVENT LISTENERS
createNoteBtn.addEventListener("click", e => {
    createNote()
})

window.addEventListener("beforeunload", async (e) => {
    await deleteEmptyNote()
    await saveNotes()
});

// FUNCTIONS
// Create note and load it
async function createNote() {
    const createRequest = await noteService.createNote({
        owner: user._id,
        title: ""
    })

    if (!createRequest.successful) {
        if (noteEmpty.exists) {
            new AlertsClass("error", "You can't create more than one note empty")
            return
        } else {
            new AlertsClass("error", "Error creating note")
            return
        }
    }

    if (notesIds.length === 0) {
        notesSubContainer.style.display = "flex"
        noNotesText.style.display = "none"
    }

    const noteData = createRequest.noteData
    notesIds.push(noteData._id)
    
    user.notes.push(noteData._id)
    localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(user))

    loadNote(noteData)
}

// Load note to Container
async function loadNote(noteData) {
    notesSubContainer.insertAdjacentHTML('beforeend', `<div class="note" id="note-${noteData._id}">
                            <textarea class="noteText" id="noteText-${noteData._id}" placeholder="Esto es una nota">${noteData.title}</textarea>
                        </div>`)

    if (noteData.title === "") {
        noteEmpty.exists = true
        noteEmpty.id = noteData._id
    }

    document.getElementById(`noteText-${noteData._id}`).addEventListener("focusout", async (e) => {
        const noteTextValue = document.getElementById(`noteText-${noteData._id}`).value

        if (noteEmpty.exists && noteEmpty.id != noteData._id && noteTextValue === "") {
            const deleteRequest = await noteService.deleteNote(noteData._id)

            notesIds.pop(noteData._id)
            document.getElementById(`note-${noteData._id}`).remove()

            if (!deleteRequest.successful) {
                new AlertsClass("error", "Something went wrong")
            }

            return
        }

        if (noteEmpty.exists && noteEmpty.id === noteData._id && noteTextValue != "") {
            noteEmpty.exists = false
            noteEmpty.id = null
        }

        const updateRequest = await noteService.updateNote(noteData._id, {
            title: noteTextValue
        })

        if (!updateRequest.successful) {
            new AlertsClass("error", "Something went wrong")
            return
        }
    })
}

// Load notes from BBDD
async function loadNotesBBDD() {
    // TODO: don´t work when more than 1 note

    const request = await noteService.getNotesByUserId(user._id)
    
    if (request.successful) {
        const notes = request.notesData

        for (let i = 0; i < notes.length; i++) {
            if (notesIds.length === 0) {
                notesSubContainer.style.display = "flex"
                noNotesText.style.display = "none"
            }

            notesIds.push(notes[i]._id)
            
            loadNote(notes[i])
        }
    }
}

// Delete empty note if exists
async function deleteEmptyNote() {
    if (noteEmpty.exists) {
        await noteService.deleteNote(noteEmpty.id)
    }
}

// Save notes
async function saveNotes() {
    for (let i = 0; i < notesIds.length; i++) {
        const noteText = document.getElementById(`noteText-${notesIds[i]}`).value
        await noteService.updateNote(notesIds[i], {title: noteText})
    }
}