// CONSTANTS
// Buttons
const projectsBtn = document.getElementById("projectsNavBar")
const workAreaBtn = document.getElementById("workAreaNavBar")
const newProjectBtn = document.getElementById("newProjectNavBar")
const logoutBtn = document.getElementById("logoutNavBar")
const noProjectsCreateProjectBtnPR = document.getElementById("noProjectsCreateProjectSpan-PR")
const noProjectsCreateProjectBtnWA = document.getElementById("noProjectsCreateProjectSpan-WA")

// Text
const noProjectsTextWA = document.getElementById("noProjectsTextWorkArea")
const noProjectsTextProjects = document.getElementById("noProjectsTextProjects")

// Containers
const projectsContainer = document.getElementById("projectsContainer")
const projectsSubContainer = document.getElementById("projectsSubContainer")
const workAreaContainer = document.getElementById("workAreaContainer")
const newProjectContainer = document.getElementById("newProjectsContainer")

// EVENT LISTENERS
projectsBtn.addEventListener("click", e => {
    hideAll()
    showProjects()
})
workAreaBtn.addEventListener("click", e => {
    hideAll()
    showWorkArea()
})
newProjectBtn.addEventListener("click", e => {
    hideAll()
    showNewProject()
})
noProjectsCreateProjectBtnPR.addEventListener("click", e => {
    hideAll()
    showNewProject()
})
noProjectsCreateProjectBtnWA.addEventListener("click", e => {
    hideAll()
    showNewProject()
})

// FUNCTIONS
function hideAll () {
    projectsContainer.style.display = "none"
    workAreaContainer.style.display = "none"
    newProjectContainer.style.display = "none"

    projectsBtn.style.fontWeight = "normal"
    workAreaBtn.style.fontWeight = "normal"
    newProjectBtn.style.fontWeight = "normal"
}
function showProjects () {
    if (projectsSubContainer.children.length === 0) { //Check for projects
        noProjectsTextProjects.style.display = "flex"
    } else {
        noProjectsTextProjects.style.display = "none"
    }

    projectsContainer.style.display = "flex"
    projectsBtn.style.fontWeight = "bold"
}
function showWorkArea () {
    if (projectsSubContainer.children.length === 0) { //Check for projects
        noProjectsTextWA.style.display = "flex"
    } else {
        noProjectsTextWA.style.display = "none"
    }

    workAreaContainer.style.display = "flex"
    workAreaBtn.style.fontWeight = "bold"
}
function showNewProject () {
    newProjectContainer.style.display = "flex"

    newProjectBtn.style.fontWeight = "bold"
}

// EXPORTS
export { hideAll, showProjects, showWorkArea, showNewProject }; 