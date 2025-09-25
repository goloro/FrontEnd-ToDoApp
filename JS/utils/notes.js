// CONSTANTS
// Buttons
const createNoteBtn = document.getElementById("createNoteButton")

// Text
const noNotesText = document.getElementById("noNotesText")

// Containers
const notesSubContainer = document.getElementById("notesSubContainer")

// VARIABLES
let numNotes = 0

// EVENT LISTENERS
createNoteBtn.addEventListener("click", e => {
    // TODO: check if the text is empty and delete it
    // TODO: store in BBDD
    let firstNote = false
    if (notesSubContainer.children.length === 0) firstNote = true
    loadNotes(firstNote)
})

// FUNCTIONS
function loadNotes(firstNote) {
    // TODO: check if the text is empty and delete it
    // TODO: store in BBDD
    // TODO: Change the ID for the ID from the BBDD
    if (firstNote) {
        notesSubContainer.style.display = "flex"
        noNotesText.style.display = "none"
    }

    notesSubContainer.innerHTML += `<div class="note" id="note-${numNotes}">
                            <textarea class="noteText" id="noteText-${numNotes}" placeholder="Esto es una nota" ></textarea>
                        </div>`
    
    numNotes++
}
function saveNote(id, text) {
    localStorage.setItem(`TDA_NOTE_${id}`, JSON.stringify(text))
}