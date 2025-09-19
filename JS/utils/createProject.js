// IMPORTS
import { AlertsClass } from '../utils/alerts.js'
import { loadProjectsWorkArea, loadProjectsProjectsView } from '../utils/loadProjects.js'
import { hideAll, showProjects, showWorkArea, showNewProject } from '../utils/menu.js';

// CONSTANTS
// Buttons
const createProjectBtn = document.getElementById("createNewProjectButton")

// Inputs
const titleInput = document.getElementById("newProjectTitleInput")
const colorBackgroundInputPicker1 = document.getElementById("newProjectColorSelectorBackgroundInputPicker1")
const colorBackgroundInputText1 = document.getElementById("newProjectColorSelectorBackgroundInputText1")
const colorBackgroundInputPicker2 = document.getElementById("newProjectColorSelectorBackgroundInputPicker2")
const colorBackgroundInputText2 = document.getElementById("newProjectColorSelectorBackgroundInputText2")
const colorTextInputPicker = document.getElementById("newProjectColorSelectorTextInputPicker")
const colorTextInputText = document.getElementById("newProjectColorSelectorTextInputText")

// Preview
const previewDiv = document.getElementById("newProjectPreview")
const previewText = document.getElementById("newProjectPreviewText")

// Containers


// VARIABLES
let background1 = "#A4DFEF"
let background2 = "#00C6FB"
let textColor = "#000000" 

// EVENT LISTENERS
createProjectBtn.addEventListener("click", e => {
    // TODO: check if any field is empty
    // TODO: check if title is correct
    // TODO: check if the color is a color hex code
    // TODO: check if all colors aren´t the same
    // TODO: store in db
    if (!checkFieldsEmpty()) {
        loadProjectsProjectsView(titleInput.value, background1, background2, textColor)
        loadProjectsWorkArea(titleInput.value, background1, background2, textColor)
        hideAll()
        showWorkArea()
        new AlertsClass("success", "Project created successfully")
    }
})
colorBackgroundInputPicker1.addEventListener("input", e => {
    background1 = colorBackgroundInputPicker1.value
    previewDiv.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    colorBackgroundInputText1.value = background1
})
colorBackgroundInputText1.addEventListener("keydown", e => {
    // TODO: check if its a real color hex code
    if (e.key === "Enter") {
        if (colorBackgroundInputText1.value != "") background1 = colorBackgroundInputText1.value
    }
    previewDiv.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    colorBackgroundInputPicker1.value = background1
})
colorBackgroundInputPicker2.addEventListener("input", e => {
    background2 = colorBackgroundInputPicker2.value
    previewDiv.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    colorBackgroundInputText2.value = background2
})
colorBackgroundInputText2.addEventListener("keydown", e => {
    // TODO: change the background of the preview and the value of the color picker 2
    if (e.key === "Enter") {
        if (colorBackgroundInputText2.value != "") background2 = colorBackgroundInputText2.value
    }
    previewDiv.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    colorBackgroundInputPicker2.value = background2
})
colorTextInputPicker.addEventListener("input", e => {                                    
    previewText.style.color = colorTextInputPicker.value
    colorTextInputText.value = colorTextInputPicker.value
})
colorTextInputText.addEventListener("keydown", e => {
    // TODO: check if its a real color hex code
    if (e.key === "Enter") {
        if (colorTextInputText.value != "") {
            previewText.style.color = colorTextInputText.value
            colorTextInputPicker.value = colorTextInputText.value
        } else {
            previewText.style.color = "#000000"
            colorTextInputPicker.value = "#000000"
        }
    }
})

// FUNCTION
function checkFieldsEmpty() {
    if (titleInput.value == "") {
        new AlertsClass("error", "The title field is empty")
        return true
    }
    return false
}