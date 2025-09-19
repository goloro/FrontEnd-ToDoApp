// IMPORTS

// CONSTANTS
// Text
const projectWorkAreaTitleText = document.getElementById("workAreaTopProjectTitle")

// Container
const workAreaTop = document.getElementById("workAreaTop")

// FUNCTIONS
function loadProjectsWorkArea(title, background1, background2, textColor) {
    projectWorkAreaTitleText.innerText = title
    workAreaTop.style.background = `linear-gradient(to bottom, ${background1}, ${background2})`
    projectWorkAreaTitleText.style.color = textColor
}

// EXPORTS
export { loadProjectsWorkArea }