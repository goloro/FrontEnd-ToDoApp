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
const addTask = document.getElementById("addTaskDiv")
const toDoListContainer = document.getElementById("toDoListContainer")
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
addTask.addEventListener("click", e => {
    addTaskToProject()
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
function addTaskToProject() {
    // TODO: Add task to project (BBDD)
    toDoListContainer.innerHTML += `<div class="toDoTask">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2"/></svg>
                                        <input class="task" maxlength="40" placeholder="This is a task"></input>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#f25050" d="M7.378 5.531a2.75 2.75 0 0 1 1.92-.781h10.297c.598 0 1.294.166 1.863.519c.579.358 1.11.974 1.11 1.856v9.75c0 .882-.531 1.497-1.11 1.856a3.65 3.65 0 0 1-1.863.519H9.298a2.75 2.75 0 0 1-1.92-.781l-5.35-5.216a1.75 1.75 0 0 1 0-2.506zM14.03 9.47a.75.75 0 1 0-1.06 1.06L14.44 12l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L16.56 12l1.47-1.47a.75.75 0 1 0-1.06-1.06l-1.47 1.47z"/></svg>
                                    </div>`
}