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

// EVENT LISTENERS
createNoteBtn.addEventListener("click", e => {
    loadNotes()
})

// FUNCTIONS
async function loadNotes() {
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

    notesSubContainer.innerHTML += `<div class="note" id="note-${noteData._id}">
                            <textarea class="noteText" id="noteText-${noteData._id}" placeholder="Esto es una nota" ></textarea>
                        </div>`

    for (let i = 0; i < notesIds.length; i++) {
        document.getElementById(`note-${notesIds[i]}`).addEventListener("click", e => {
            const updateRequest = noteService.updateNote(notesIds[i], {
                title: document.getElementById(`noteText-${notesIds[i]}`).value
            })

            console.log(updateRequest)

            if (!updateRequest.successful) {
                new AlertsClass("error", "Something went wrong")
                return
            }
        })
    }
}
function saveNote(id, text) {
    localStorage.setItem(`TDA_NOTE_${id}`, JSON.stringify(text))
}