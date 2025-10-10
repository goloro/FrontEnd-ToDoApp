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

// LOAD NOTES
await loadNotesBBDD()

// EVENT LISTENERS
createNoteBtn.addEventListener("click", e => {
    createNote()
})

// FUNCTIONS
// TODO: Save all notes when close window
// TODO: Delete note when text is empty if there exists one more

// Create note and load it
async function createNote() {
    const createRequest = await noteService.createNote({
        owner: user._id,
        title: ""
    })

    if (!createRequest.successful) {
        if (createRequest.alreadyEmpty) {
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
    notesSubContainer.innerHTML += `<div class="note" id="note-${noteData._id}">
                            <textarea class="noteText" id="noteText-${noteData._id}" placeholder="Esto es una nota" ></textarea>
                        </div>`
    
    document.getElementById(`noteText-${noteData._id}`).value = noteData.title

    for (let i = 0; i < notesIds.length; i++) {
        document.getElementById(`note-${notesIds[i]}`).addEventListener("focusout", async (e) => {
            
            const updateRequest = await noteService.updateNote(notesIds[i], {
                title: document.getElementById(`noteText-${notesIds[i]}`).value
            })

            if (!updateRequest.successful) {
                new AlertsClass("error", "Something went wrong")
                return
            }
        })
    }
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