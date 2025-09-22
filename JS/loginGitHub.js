// IMPORTS
import { AlertsClass } from '../JS/utils/alerts.js'

// CONSTANTS
// Buttons
const loginBtn = document.getElementById("button-login")

alert()

// EVENT LISTENERS
loginBtn.addEventListener("click", e => {
    window.open('../HTML/app.html', '_blank')
})

// FUNCTIONS
function alert() {
    new AlertsClass("success", "We are working on it! Press Sign In to enter the app", 4000)
}

