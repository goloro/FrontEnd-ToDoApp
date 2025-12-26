// CONSTANTS
// Text
const userMenuNavBarName = document.getElementById("userMenuNavBarName")

// Images
const userMenuNavBarUserIcon = document.getElementById("userMenuNavBarUserIcon")

// Buttons
const projectsBtn = document.getElementById("projectsNavBar")
const workAreaBtn = document.getElementById("workAreaNavBar")
const newProjectBtn = document.getElementById("newProjectNavBar")
const logoutBtn = document.getElementById("userMenuNavBarLogoutIcon")
const noProjectsCreateProjectBtnPR = document.getElementById("noProjectsCreateProjectSpan-PR")
const noProjectsCreateProjectBtnWA = document.getElementById("noProjectsCreateProjectSpan-WA")

// Text
const noProjectsTextWA = document.getElementById("noProjectsTextWorkArea")
const noProjectsTextProjects = document.getElementById("noProjectsTextProjects")

// Inputs
const projectDocumentation = document.getElementById("documentation")

// Containers
const projectsContainer = document.getElementById("projectsContainer")
const projectsSubContainer = document.getElementById("projectsSubContainer")
const workAreaContainer = document.getElementById("workAreaContainer")
const workAreaSubContainer = document.getElementById("workAreaSubContainer")
const newProjectContainer = document.getElementById("newProjectsContainer")
const toDoListContainer = document.getElementById("toDoListContainer")
const editUserContainer = document.getElementById("editUserContainer")

const mobileUserMenuName = document.getElementById("userMenuNavBarName-Mobile")
const mobileUserMenuIcon = document.getElementById("userMenuNavBarUserIcon-Mobile")
const mobileLogoutBtn = document.getElementById("userMenuNavBarLogoutIcon-Mobile")

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
userMenuNavBarName.addEventListener("click", e => {
    hideAll()
    showEditUser()
})
userMenuNavBarUserIcon.addEventListener("click", e => {
    hideAll()
    showEditUser()
})

// Mobile Listeners
if (mobileUserMenuName) mobileUserMenuName.addEventListener("click", () => { hideAll(); showEditUser(); })
if (mobileUserMenuIcon) mobileUserMenuIcon.addEventListener("click", () => { hideAll(); showEditUser(); })
if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("TDA_USER_LOGUED")
    window.open('/FrontEnd-ToDoApp/index.html', '_self')
})

logoutBtn.addEventListener("click", e => {
    localStorage.removeItem("TDA_USER_LOGUED")
    window.open('/FrontEnd-ToDoApp/index.html', '_self')
})

// FUNCTIONS
function hideAll() {
    projectsContainer.style.display = "none"
    workAreaContainer.style.display = "none"
    newProjectContainer.style.display = "none"
    editUserContainer.style.display = "none"

    projectsBtn.style.fontWeight = "normal"
    workAreaBtn.style.fontWeight = "normal"
    newProjectBtn.style.fontWeight = "normal"
}
function showProjects() {
    if (projectsSubContainer.children.length === 0) { //Check for projects
        noProjectsTextProjects.style.display = "flex"
        projectsSubContainer.style.display = "none"
    } else {
        noProjectsTextProjects.style.display = "none"
    }

    projectsContainer.style.display = "flex"
    projectsBtn.style.fontWeight = "bold"

    toDoListContainer.innerHTML = ""
    projectDocumentation.value = ""
}
function showWorkArea() {
    if (projectsSubContainer.children.length === 0) { //Check for projects
        noProjectsTextWA.style.display = "flex"
        workAreaSubContainer.style.display = "none"
    } else {
        noProjectsTextWA.style.display = "none"
    }

    workAreaContainer.style.display = "flex"
    workAreaBtn.style.fontWeight = "bold"
}
function showNewProject() {
    newProjectContainer.style.display = "flex"

    newProjectBtn.style.fontWeight = "bold"

    toDoListContainer.innerHTML = ""
    projectDocumentation.value = ""
}
function showEditUser() {
    editUserContainer.style.display = "flex"
}
// EXPORTS
export { hideAll, showProjects, showWorkArea, showNewProject, showEditUser }; 