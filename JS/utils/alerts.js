// CONSTANTS
const alertBox = document.getElementById("alertBox")
const alertBoxIcon = document.getElementById("alertBoxIcon")
const alertBoxText = document.getElementById("alertBoxText")

// ALERTS
class AlertsClass {
    constructor(icon, text, color) {
        alertBox.style.display = "flex"
        document.getElementById("alertBoxSubDiv").style.backgroundColor = color
        alertBoxIcon.src = icon
        alertBoxText.innerHTML = text

        setTimeout(deleteAlert, 2000)
    }
}

function deleteAlert() {
    alertBox.style.display = "none"
    alertBoxIcon.src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
    alertBoxText.innerHTML = "Alert"
}

export {AlertsClass}