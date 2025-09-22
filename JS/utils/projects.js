// IMPORTS
import { AlertsClass } from '../utils/alerts.js'
import { hideAll, showWorkArea } from '../utils/menu.js';

// CONSTANTS
// Buttons
const createProjectBtn = document.getElementById("createNewProjectButton")

// Text
const noProjectsTextWA = document.getElementById("noProjectsTextWorkArea")
const noProjectsTextProjects = document.getElementById("noProjectsTextProjects")
const projectWorkAreaTitleText = document.getElementById("workAreaTopProjectTitle")

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
const workAreaTop = document.getElementById("workAreaTop")
const projectsSubContainer = document.getElementById("projectsSubContainer")
const workAreaSubContainer = document.getElementById("workAreaSubContainer")

// VARIABLES
let background1 = "#A4DFEF"
let background2 = "#00C6FB"
let textColor = "#000000" 
let numProjects = 0

// EVENT LISTENERS
createProjectBtn.addEventListener("click", e => {
    // TODO: check if any field is empty
    // TODO: check if title is correct
    // TODO: check if the color is a color hex code
    // TODO: check if all colors aren´t the same
    // TODO: store in BBDD
    if (!checkFieldsEmpty()) {
        let firstProject = false
        if (projectsSubContainer.children.length === 0) firstProject = true
        loadProjectsProjectsView(titleInput.value, background1, background2, textColor, firstProject)
        loadProjectsWorkArea(titleInput.value, background1, background2, textColor, firstProject)
        hideAll()
        showWorkArea()
        new AlertsClass("success", "Project created successfully", null)
    }
})
titleInput.addEventListener("input", e => {
    if (titleInput.value === "") previewText.innerText = "Project Title"
    else previewText.innerText = titleInput.value
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
    textColor = colorTextInputPicker.value
})
colorTextInputText.addEventListener("keydown", e => {
    // TODO: check if its a real color hex code
    if (e.key === "Enter") {
        if (colorTextInputText.value != "") {
            previewText.style.color = colorTextInputText.value
            colorTextInputPicker.value = colorTextInputText.value
            textColor = colorTextInputText.value
        } else {
            previewText.style.color = "#000000"
            colorTextInputPicker.value = "#000000"
        }
    }
})

// FUNCTION
function checkFieldsEmpty() {
    if (titleInput.value == "") {
        new AlertsClass("error", "The title field is empty", null)
        return true
    }
    return false
}

function loadProjectsWorkArea(title, background1, background2, textColor, firstProject) {
    if (firstProject) {
        noProjectsTextWA.style.display = "none"
        workAreaSubContainer.style.display = "flex"
    }
    projectWorkAreaTitleText.innerText = title
    workAreaTop.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    projectWorkAreaTitleText.style.color = textColor
}

function loadProjectsProjectsView(title, background1, background2, textColor, firstProject) {
    if (firstProject) {
        noProjectsTextProjects.style.display = "none"
        projectsSubContainer.style.display = "grid"
    }
    projectsSubContainer.innerHTML += `<div class="project" id="project-${numProjects}">
                                        <p class="projectTitle" id="projectTitle-${numProjects}">${title}</p>
                                   </div>`;
    document.getElementById(`project-${numProjects}`).style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    document.getElementById(`projectTitle-${numProjects}`).style.color = textColor
    numProjects++
}