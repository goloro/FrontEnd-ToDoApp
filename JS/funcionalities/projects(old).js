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
let background1 = "#A4DFEF"
let background2 = "#00C6FB"
let textColor = "#000000" 
let numProjects = 0
let numTasks = 0
let checkedTasks = 0
let currentProject = null
let projectsIds = []

// LOAD PROJECTS
await loadProjectsBBDD()

// EVENT LISTENERS
createProjectBtn.addEventListener("click", async (e) => {
    // TODO: check if any field is empty
    // TODO: check if title is correct
    // TODO: check if the color is a color hex code
    // TODO: check if all colors aren´t the same
    if (!checkFieldsEmpty()) {
        let firstProject = false
        if (projectsSubContainer.children.length === 0) firstProject = true

        currentProject = await createProject(titleInput.value, background1, background2, textColor, firstProject)
        
        hideAll()
        showWorkArea()
        loadDefaultValuesNewProject()

        numProjects++
        toDoListContainer.innerHTML = ""
        numTasks = 0
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
returnWorkAreaBtn.addEventListener("click", e => {
    hideAll()
    showProjects()
})
deleteProject.addEventListener("click", e => {
    // TODO: Delete project (BBDD)
    // TODO: Change view to projects view
    // TODO: Change the selected default project
    // TODO: Change the way to show the las project 
    document.getElementById(`project-${currentProject._id}`).remove()
    hideAll()
    showProjects()
    if (numProjects > 0) loadDefaultProject()
    else {
        // TODO: Get the last project from the BBDD and show all the information
        // IT WILL BE THE LAST PROJECT FROM THE BBDD
        loadDefaultProject()
    }
    
    numProjects--
    currentProject = numProjects
    new AlertsClass("success", "Project deleted successfully", null)
})

// FUNCTION
function checkFieldsEmpty() {
    if (titleInput.value == "") {
        new AlertsClass("error", "The title field is empty", null)
        return true
    }
    return false
}

async function createProject(title, background1, background2, textColor, firstProject) {
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
        numProjects++
        loadProjectsProjectsView(createProjectRequest.projectData, firstProject)
        loadProjectsWorkArea(createProjectRequest.projectData, firstProject)
    }

    return createProjectRequest.projectData
}

async function loadProjectsBBDD() {
    const projectsRequest = await projectService.getProjectsByUserId(user._id)
    if (projectsRequest.successful) {
        let firstProject = true
        for (let i=0; i < projectsRequest.projects.length; i++) {
            const project = projectsRequest.projects[i]

            if (projectsIds.length != 0 && i != 0) firstProject = false

            projectsIds.push(project._id)
            numProjects++

            loadProjectsProjectsView(project, firstProject)
        }
    }
}

function loadDefaultValuesNewProject() {
    titleInput.value = ""
    colorBackgroundInputPicker1.value = "#A4DFEF"
    colorBackgroundInputText1.value = ""
    colorBackgroundInputPicker2.value = "#00C6FB"
    colorBackgroundInputText2.value = ""
    colorTextInputPicker.value = "#000000"
    colorTextInputText.value = ""
    previewDiv.style.background = `linear-gradient(to bottom, #A4DFEF, #00C6FB)`
    previewText.style.color = "#000000"
    previewText.innerText = "Project Title"
    background1 = "#A4DFEF"
    background2 = "#00C6FB"
    textColor = "#000000"
}

function loadDefaultProject() {
    loadProjectsWorkArea("Project Title", "#a4dfef", "#00c6fb", "#000000", false)
}

function loadProjectsWorkArea(projectData) {
    if (projectsIds.length != 0) {
        noProjectsTextWA.style.display = "none"
        workAreaSubContainer.style.display = "flex"
    }
    projectWorkAreaTitleText.innerText = projectData.title
    workAreaTop.style.background = `linear-gradient(to bottom, ${projectData.colors.background1}, ${projectData.colors.background2})`
    projectWorkAreaTitleText.style.color = projectData.colors.text
}

function loadProjectsProjectsView(projectData, firstProject) {
    // TODO: Change the ID for the ID from the BBDD
    if (firstProject) {
        noProjectsTextProjects.style.display = "none"
        projectsSubContainer.style.display = "grid"
    }

    projectsSubContainer.insertAdjacentHTML('beforeend', `<div class="project" id="project-${projectData._id}">
                                        <p class="projectTitle" id="projectTitle-${projectData._id}">${projectData.title}</p>
                                   </div>`)
    document.getElementById(`project-${projectData._id}`).style.background = `linear-gradient(to bottom, ${projectData.colors.background1}, ${projectData.colors.background2})`
    document.getElementById(`projectTitle-${projectData._id}`).style.color = projectData.colors.text

    document.getElementById(`project-${projectData._id}`).addEventListener("click", async (e) => {
        hideAll()
        showWorkArea()
        let projectId = e.currentTarget.id.split("-")[1]
        
        const projectRequest = await projectService.getProjectById(projectId)
        if (projectRequest.successful) {
            currentProject = projectRequest.projectData

            loadProjectsWorkArea(projectRequest.projectData)
            //workAreaTop.style.background = e.currentTarget.style.background
        }
    })

    // TODO: CHANGE THE WAY TO SELECT THE PROJECT
    /*for (let i = 0; i <= projectsIds.length; i++) {
        document.getElementById(`project-${projectsIds[i]}`).addEventListener("click", e => {
            // TODO: Get the project information from the BBDD
            hideAll()
            showWorkArea()

            // TEMPORAL
            let title = e.currentTarget.children[0].innerText
            let textColor = e.currentTarget.children[0].style.color
            loadProjectsWorkArea(title, projectData.background1, projectData.background2, textColor, firstProject)
            workAreaTop.style.background = e.currentTarget.style.background
        })
    }*/
}
function addTaskToProject() {
    // TODO: Add task to project (BBDD)
    // TODO: Change by clickng the icon to a marked task
    // TODO: Delete task by clicking the delete icon
    // TODO: Store the tasks in the BBDD
    // TODO: Don´t allow to add more than 1 empty task
    // TODO: Change the ID for the ID from the BBDD
    toDoListContainer.innerHTML += `<div class="toDoTask" id="toDoTask-${numTasks}">
                                        <img id="checkPNGTask-${numTasks}" src="../Images/checkbox-unchecked.png">
                                        <input class="task" id="task-${numTasks}" maxlength="40" placeholder="This is a task"></input>
                                        <svg id="deleteSVGTask-${numTasks}" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#f25050" d="M7.378 5.531a2.75 2.75 0 0 1 1.92-.781h10.297c.598 0 1.294.166 1.863.519c.579.358 1.11.974 1.11 1.856v9.75c0 .882-.531 1.497-1.11 1.856a3.65 3.65 0 0 1-1.863.519H9.298a2.75 2.75 0 0 1-1.92-.781l-5.35-5.216a1.75 1.75 0 0 1 0-2.506zM14.03 9.47a.75.75 0 1 0-1.06 1.06L14.44 12l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L16.56 12l1.47-1.47a.75.75 0 1 0-1.06-1.06l-1.47 1.47z"/></svg>
                                    </div>`
    numTasks++
    updatePercentage()

    for (let i = 0; i < numTasks; i++) {
        document.getElementById(`checkPNGTask-${i}`).addEventListener("click", e => {
            if (e.currentTarget.src.includes('checkbox-unchecked.png')) {
                e.currentTarget.src = "../Images/checkbox-checked.png"
                document.getElementById(`task-${i}`).style.textDecoration = "line-through"
                checkedTasks++
            } else {
                e.currentTarget.src = "../Images/checkbox-unchecked.png"
                document.getElementById(`task-${i}`).style.textDecoration = "none"
                checkedTasks--
            }
            updatePercentage()
        })
        document.getElementById(`deleteSVGTask-${i}`).addEventListener("click", e => {
            if (document.getElementById(`checkPNGTask-${i}`).src.includes('checkbox-checked.png')) checkedTasks--
            document.getElementById(`toDoTask-${i}`).remove()
            numTasks--
            updatePercentage()
        })
    }
}
function updatePercentage() {
    let percentage = checkedTasks / numTasks * 100
    if (isNaN(percentage)) percentage = 0
    percentajeVariable.style.width = `${percentage}%`
    percentajeProjectText.innerText = `${Math.round(percentage)}%`
}