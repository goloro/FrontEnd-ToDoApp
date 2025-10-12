// IMPORTS
import { ProjectServiceClass } from "../service/projectService.js"
import { AlertsClass } from '../utils/alerts.js'
import { hideAll, showProjects, showWorkArea } from '../utils/menu.js';

// CONSTANTS
// Service
const projectService = new ProjectServiceClass()

// User
const user = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

// Buttons
const createProjectBtn = document.getElementById("createNewProjectButton")
const returnWorkAreaBtn = document.getElementById("workAreaTopReturnButton")

// Text
const noProjectsTextWA = document.getElementById("noProjectsTextWorkArea")
const noProjectsTextProjects = document.getElementById("noProjectsTextProjects")
const projectWorkAreaTitleText = document.getElementById("workAreaTopProjectTitle")
const percentajeProjectText = document.getElementById("percentajeProject")

// Inputs
const titleInput = document.getElementById("newProjectTitleInput")
const colorBackgroundInputPicker1 = document.getElementById("newProjectColorSelectorBackgroundInputPicker1")
const colorBackgroundInputText1 = document.getElementById("newProjectColorSelectorBackgroundInputText1")
const colorBackgroundInputPicker2 = document.getElementById("newProjectColorSelectorBackgroundInputPicker2")
const colorBackgroundInputText2 = document.getElementById("newProjectColorSelectorBackgroundInputText2")
const colorTextInputPicker = document.getElementById("newProjectColorSelectorTextInputPicker")
const colorTextInputText = document.getElementById("newProjectColorSelectorTextInputText")
const projectDocumentation = document.getElementById("documentation")

// Preview
const previewDiv = document.getElementById("newProjectPreview")
const previewText = document.getElementById("newProjectPreviewText")

// Containers
const workAreaTop = document.getElementById("workAreaTop")
const deleteProject = document.getElementById("workAreaTopDeleteDiv")
const addTask = document.getElementById("addTaskDiv")
const toDoListContainer = document.getElementById("toDoListContainer")
const projectsSubContainer = document.getElementById("projectsSubContainer")
const workAreaSubContainer = document.getElementById("workAreaSubContainer")
const percentajeVariable = document.getElementById("percentajeVariable")


// VARIABLES
let colors = {
    background1: "#A4DFEF",
    background2: "#00C6FB",
    text: "#000000"
}
let projectsIds = []
let currentProject = null

// EVENT LISTENER
createProjectBtn.addEventListener("click", e => {
    // TODO: check if any field is empty
    // TODO: check if title is correct
    // TODO: check if the color is a color hex code
    // TODO: check if all colors aren´t the same
    // TODO: check if there are fields empty

    let createProject = createProject(titleInput.value, colors.background1, colors.background2, colors.text)
    if (createProject) {

    }
})

// FUNCTIONS
async function createProject(title, background1, background2, textColor) {
    const projectData = {
        owner: user._id,
        title: title,
        colors: {
            background1: background1,
            background2: background2,
            text: textColor
        }
    }

    const createProjectRequest = await projectService.createProject(projectData)
    if (createProjectRequest.successful) {
        projectsIds.push(createProjectRequest.projectData._id)
        loadProjectsProjectsView(createProjectRequest.projectData)
        loadProjectsWorkArea(createProjectRequest.projectData, true)
        currentProject = createProjectRequest.projectData

        return true
    } else {
        new AlertsClass("error", "Error creating project")
        return false
    }
}

function loadProjectsProjectsView(projectData) {
    if (projectsIds.length === 1) {
        noProjectsTextProjects.style.display = "none"
        projectsSubContainer.style.display = "grid"
    }

    projectsSubContainer.insertAdjacentHTML('beforeend', `<div class="project" id="project-${projectData._id}">
                                        <p class="projectTitle" id="projectTitle-${projectData._id}">${projectData.title}</p>
                                   </div>`)
    let projectElement = document.getElementById(`project-${projectData._id}`)
    document.getElementById(`projectTitle-${projectData._id}`).style.color = projectData.colors.text

    projectElement.addEventListener("click", async (e) => {
        hideAll()
        showWorkArea()
        let projectId = e.currentTarget.id.split("-")[1]
            
        const projectRequest = await projectService.getProjectById(projectId)
        if (projectRequest.successful) {
            currentProject = projectRequest.projectData
    
            loadProjectsWorkArea(projectRequest.projectData, false)
        }
    })
}

function loadProjectsWorkArea(projectData, newOne) {
    if (projectsIds.length === 1) {
        noProjectsTextWA.style.display = "none"
        workAreaSubContainer.style.display = "flex"
    }

    projectWorkAreaTitleText.innerText = projectData.title
    workAreaTop.style.background = `linear-gradient(to bottom, ${projectData.colors.background1}, ${projectData.colors.background2})`
    projectWorkAreaTitleText.style.color = projectData.colors.text

    if (!newOne) {
        // TODO: load tasks
        projectDocumentation.value = projectData.documentation
    }
}