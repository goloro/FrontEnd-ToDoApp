// CONSTANTS
// Buttons
const projectsBtn = document.getElementById("projectsNavBar")
const workAreaBtn = document.getElementById("workAreaNavBar")
const newProjectBtn = document.getElementById("newProjectNavBar")
const logoutBtn = document.getElementById("logoutNavBar")
const noProjectsCreateProjectBtn = document.getElementById("noProjectsCreateProjectSpan")

// Text
const noProjectsText = document.getElementById("noProjects")

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
noProjectsCreateProjectBtn.addEventListener("click", e => {
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
        noProjectsText.style.display = "flex"
    } else {
        noProjectsText.style.display = "none"
    }

    projectsContainer.style.display = "flex"
    projectsBtn.style.fontWeight = "bold"
}
function showWorkArea () {
    workAreaContainer.style.display = "flex"

    workAreaBtn.style.fontWeight = "bold"
}
function showNewProject () {
    newProjectContainer.style.display = "flex"

    newProjectBtn.style.fontWeight = "bold"
}