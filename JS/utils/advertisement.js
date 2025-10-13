// IMPORTS
import { AlertsClass } from './alerts.js'
// CONST
// Buttons
const acceptAdvertisementCheckbox = document.getElementById("acceptAdvertisementCheckbox")
const acceptAdvertisementBtn = document.getElementById("acceptAdvertisementBtn")

// Container
const advertisementContainer = document.getElementById("advertisementContainer")

// VARIABLES
let textAccepted = false

// EVENT LISTENERS
acceptAdvertisementCheckbox.addEventListener("click", e => {
    if (e.currentTarget.src.includes('checkbox-unchecked.png')) {
            e.currentTarget.src = "../Images/checkbox-checked.png"
            textAccepted = true
        } else {
            e.currentTarget.src = "../Images/checkbox-unchecked.png"
            textAccepted = false
        }
})

acceptAdvertisementBtn.addEventListener("click", e => {
    if (textAccepted) {
        advertisementContainer.style.display = "none"
    } else {
        new AlertsClass("error", "Please accept the terms and conditions.", null)
    }
})