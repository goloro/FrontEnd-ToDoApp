// IMPORTS

// CONSTANTS
// Text
const noProjectsText = document.getElementById("noProjects")
const projectWorkAreaTitleText = document.getElementById("workAreaTopProjectTitle")

// Container
const workAreaTop = document.getElementById("workAreaTop")
const projectsSubContainer = document.getElementById("projectsSubContainer")

// VARIABLES
let numProjects = 0

// FUNCTIONS
function loadProjectsWorkArea(title, background1, background2, textColor) {
    projectWorkAreaTitleText.innerText = title
    workAreaTop.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    projectWorkAreaTitleText.style.color = textColor
}

function loadProjectsProjectsView(title, background1, background2, textColor) {
    if (projectsSubContainer.children.length === 0) {
        noProjectsText.style.display = "none"
        projectsSubContainer.style.display = "grid"
    }
    projectsSubContainer.innerHTML += `<div class="project" id="project-${numProjects}">
                                        <p class="projectTitle" id="projectTitle-${numProjects}">${title}</p>
                                   </div>`;
    document.getElementById(`project-${numProjects}`).style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    document.getElementById(`projectTitle-${numProjects}`).style.color = textColor
    numProjects++
}

// EXPORTS
export { loadProjectsWorkArea, loadProjectsProjectsView}