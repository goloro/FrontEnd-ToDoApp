// IMPORTS
import { ProjectServiceClass } from "../service/projectService.js"
import { TaskServiceClass } from "../service/taskService.js"
import { AlertsClass } from '../utils/alerts.js'
import { hideAll, showProjects, showWorkArea } from '../utils/menu.js';

// CONSTANTS
// Service
const projectService = new ProjectServiceClass()
const taskService = new TaskServiceClass()

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
let tasksIds = []
let checkedTasks = 0
let taskEmpty = { exists: false, id: null }

// LOAD PROJECTS
if (user.projects) await loadProjectsBBDD()

// EVENT LISTENER
createProjectBtn.addEventListener("click", async (e) => {
    // TODO: check if any field is empty
    // TODO: check if title is correct
    // TODO: check if the color is a color hex code
    // TODO: check if all colors aren´t the same
    // TODO: check if there are fields empty

    let projectCreated = await createProject(titleInput.value, colors.background1, colors.background2, colors.text)
    if (projectCreated) {
        toDoListContainer.innerHTML = ""
        projectDocumentation.value = ""

        hideAll()
        showWorkArea()
        loadDefaultValuesNewProject()

        new AlertsClass("success", "Project created successfully", null)
    }
})
titleInput.addEventListener("input", e => {
    if (titleInput.value === "") previewText.innerText = "Project Title"
    else previewText.innerText = titleInput.value
})
colorBackgroundInputPicker1.addEventListener("input", e => {
    colors.background1 = colorBackgroundInputPicker1.value
    previewDiv.style.background = `linear-gradient(to bottom, ${colors.background1}, ${colors.background2})`
    colorBackgroundInputText1.value = colors.background1
})
colorBackgroundInputText1.addEventListener("keydown", e => {
    // TODO: check if its a real color hex code
    if (e.key === "Enter") {
        if (colorBackgroundInputText1.value != "") colors.background1 = colorBackgroundInputText1.value
    }
    previewDiv.style.background = `linear-gradient(to bottom, ${colors.background1}, ${colors.background2})`
    colorBackgroundInputPicker1.value = colors.background1
})
colorBackgroundInputPicker2.addEventListener("input", e => {
    colors.background2 = colorBackgroundInputPicker2.value
    previewDiv.style.background = `linear-gradient(to bottom, ${colors.background1}, ${colors.background2})`
    colorBackgroundInputText2.value = colors.background2
})
colorBackgroundInputText2.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        if (colorBackgroundInputText2.value != "") colors.background2 = colorBackgroundInputText2.value
    }
    previewDiv.style.background = `linear-gradient(to bottom, ${colors.background1}, ${colors.background2})`
    colorBackgroundInputPicker2.value = colors.background2
})
colorTextInputPicker.addEventListener("input", e => {                                    
    previewText.style.color = colorTextInputPicker.value
    colorTextInputText.value = colorTextInputPicker.value
    colors.text = colorTextInputPicker.value
})
colorTextInputText.addEventListener("keydown", e => {
    // TODO: check if its a real color hex code
    if (e.key === "Enter") {
        if (colorTextInputText.value != "") {
            previewText.style.color = colorTextInputText.value
            colorTextInputPicker.value = colorTextInputText.value
            colors.text = colorTextInputText.value
        } else {
            previewText.style.color = "#000000"
            colorTextInputPicker.value = "#000000"
        }
    }
})
addTask.addEventListener("click", async (e) => {
    await addTaskToProject()
})
projectDocumentation.addEventListener("focusout", async (e) => {
    await updateProjectDocumentation()
})
projectDocumentation.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") await updateProjectDocumentation()
})
returnWorkAreaBtn.addEventListener("click", e => {
    hideAll()
    showProjects()
})
deleteProject.addEventListener("click", async (e) => {
    const deleteRequest = await projectService.deleteProject(currentProject._id)
    if (!deleteRequest.successful) {
        new AlertsClass("error", "Error deleting project")
        return
    }
    
    projectsIds.pop(currentProject._id)
    document.getElementById(`project-${currentProject._id}`).remove()

    hideAll()
    showProjects()

    if (projectsIds.length === 0) {
        loadDefaultProject()
        currentProject = null
    } else {
        const lastProjectRequest = await projectService.getProjectById(projectsIds[projectsIds.length - 1])
        if (!lastProjectRequest.successful) {
            loadDefaultProject()
            return
        }

        loadProjectsWorkArea(lastProjectRequest.projectData)
        currentProject = lastProjectRequest.projectData
    }
    
    new AlertsClass("success", "Project deleted successfully", null)
})

// FUNCTIONS
async function loadProjectsBBDD() {
    const projectsRequest = await projectService.getProjectsByUserId(user._id)

    if (projectsRequest.successful) {
        const projects = projectsRequest.projects

        for (let i=0; i < projects.length; i++) {
            projectsIds.push(projects[i]._id)

            if (i != 0) {
                noProjectsTextWA.style.display = "none"
                workAreaSubContainer.style.display = "flex"
            }

            loadProjectsProjectsView(projects[i])
            currentProject = projects[i]
        }
    }
}

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

function loadDefaultProject() {
    let defaultProjectData = {
        title: "Project Title",
        colors: {
            background1: "#a4dfef",
            background2: "#00c6fb",
            text: "#000000"
        }
    }
    loadProjectsWorkArea(defaultProjectData)
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

function loadProjectsProjectsView(projectData) {
    if (projectsIds.length === 1) {
        noProjectsTextProjects.style.display = "none"
        projectsSubContainer.style.display = "grid"
    }

    projectsSubContainer.insertAdjacentHTML('beforeend', `<div class="project" id="project-${projectData._id}">
                                        <p class="projectTitle" id="projectTitle-${projectData._id}">${projectData.title}</p>
                                   </div>`)
    let projectElement = document.getElementById(`project-${projectData._id}`)
    projectElement.style.background = `linear-gradient(to bottom, ${projectData.colors.background1}, ${projectData.colors.background2})`
    document.getElementById(`projectTitle-${projectData._id}`).style.color = projectData.colors.text

    projectElement.addEventListener("click", async (e) => {
        let projectId = e.currentTarget.id.split("-")[1]
            
        const projectRequest = await projectService.getProjectById(projectId)
        if (projectRequest.successful) {
            currentProject = projectRequest.projectData
    
            loadProjectsWorkArea(projectRequest.projectData, false)
        }

        hideAll()
        showWorkArea()
    })
}

async function loadProjectsWorkArea(projectData, newOne) {
    if (projectsIds.length === 1) {
        noProjectsTextWA.style.display = "none"
        workAreaSubContainer.style.display = "flex"
    }

    projectWorkAreaTitleText.innerText = projectData.title
    workAreaTop.style.background = `linear-gradient(to bottom, ${projectData.colors.background1}, ${projectData.colors.background2})`
    projectWorkAreaTitleText.style.color = projectData.colors.text

    if (!newOne) {
        const tasksRequest = await taskService.getTasksByProjectId(projectData._id)
        if (tasksRequest.successful) {
            const tasks = tasksRequest.tasks
            for (let i=0; i < tasks.length; i++) {
                tasksIds.push(tasks[i]._id)
                await addTaskToProject(tasks[i])
            }
        }
        if (projectData.documentation) projectDocumentation.value = projectData.documentation
    }
}

async function addTaskToProject(taskData) {
    let newTask = false
    if (!taskData) {
        newTask = true
        taskData = {
            owner: user._id,
            project: currentProject._id,
            title: ""
        }
    }

    if (newTask) {
        const request = await taskService.createTask(taskData)
        if (!request.successful) {
            if (request.alreadyEmpty) new AlertsClass("error", "There can't be more than 1 empty task")
            else new AlertsClass("error", "Error creating task")
            return
        }
        
        taskData._id = request.taskData._id
        taskData.status = request.taskData.status

        taskEmpty.exists = true
        taskEmpty.id = request.taskData._id

        tasksIds.push(taskData._id)
    }

    toDoListContainer.insertAdjacentHTML('beforeend', `<div class="toDoTask" id="toDoTask-${taskData._id}">
                                                            <img id="checkPNGTask-${taskData._id}" src="../Images/checkbox-unchecked.png">
                                                            <input class="task" id="task-${taskData._id}" maxlength="40" placeholder="This is a task"></input>
                                                            <svg id="deleteSVGTask-${taskData._id}" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#f25050" d="M7.378 5.531a2.75 2.75 0 0 1 1.92-.781h10.297c.598 0 1.294.166 1.863.519c.579.358 1.11.974 1.11 1.856v9.75c0 .882-.531 1.497-1.11 1.856a3.65 3.65 0 0 1-1.863.519H9.298a2.75 2.75 0 0 1-1.92-.781l-5.35-5.216a1.75 1.75 0 0 1 0-2.506zM14.03 9.47a.75.75 0 1 0-1.06 1.06L14.44 12l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L16.56 12l1.47-1.47a.75.75 0 1 0-1.06-1.06l-1.47 1.47z"/></svg>
                                                        </div>`)

    if (!newTask) document.getElementById(`task-${taskData._id}`).value = taskData.title

    updatePercentage()
                        
    document.getElementById(`checkPNGTask-${taskData._id}`).addEventListener("click", async (e) => {
        let taskId = e.currentTarget.id.split("-")[1]
        let status = null

        if (e.currentTarget.src.includes('checkbox-unchecked.png')) {
            status = "checked"
            e.currentTarget.src = "../Images/checkbox-checked.png"
            document.getElementById(`task-${taskId}`).style.textDecoration = "line-through"
            checkedTasks++
        } else {
            status = "unchecked"
            e.currentTarget.src = "../Images/checkbox-unchecked.png"
            document.getElementById(`task-${taskId}`).style.textDecoration = "none"
            checkedTasks--
        }

        await taskService.updateTask(taskId, { status: status })
        
        updatePercentage()
    })
    document.getElementById(`task-${taskData._id}`).addEventListener("focusout", async (e) => {
        let taskId = e.currentTarget.id.split("-")[1]

        if (e.currentTarget.value === "") {
            if (taskEmpty.exists && taskEmpty.id != taskId) {
                const deleteRequest = await taskService.deleteTask(taskId, currentProject._id)

                if (!deleteRequest.successful) {
                    new AlertsClass("error", "Error deleting task")
                    return
                }

                if (document.getElementById(`checkPNGTask-${taskId}`).src.includes('checkbox-checked.png')) checkedTasks--
                document.getElementById(`toDoTask-${taskId}`).remove()

                tasksIds.pop(taskId)
                
                updatePercentage()
            }
        } else {
            const updateRequest = await taskService.updateTask(taskId, { title: e.currentTarget.value })

            if (!updateRequest.successful) {
                new AlertsClass("error", "Error updating task")
                return
            }

            if (taskEmpty.exists && taskEmpty.id === taskId) {
                taskEmpty.exists = false
                taskEmpty.id = null
            }
        }
    })
    document.getElementById(`deleteSVGTask-${taskData._id}`).addEventListener("click", async (e) => {
        let taskId = e.currentTarget.id.split("-")[1]

        const deleteRequest = await taskService.deleteTask(taskId, currentProject._id)

        if (!deleteRequest.successful) {
            new AlertsClass("error", "Error deleting task")
            return
        }

        if (document.getElementById(`checkPNGTask-${taskId}`).src.includes('checkbox-checked.png')) checkedTasks--
        document.getElementById(`toDoTask-${taskId}`).remove()

        tasksIds.pop(taskId)
        
        updatePercentage()
    })
}

function updatePercentage() {
    let percentage = checkedTasks / tasksIds.length * 100
    if (isNaN(percentage)) percentage = 0
    percentajeVariable.style.width = `${percentage}%`
    percentajeProjectText.innerText = `${Math.round(percentage)}%`
}

async function updateProjectDocumentation() {
    currentProject.documentation = projectDocumentation.value

    await projectService.updateProject(currentProject._id, currentProject)
}