// CONSTANTS
const alertBox = document.getElementById("alertBox")
const alertBoxIcon = document.getElementById("alertBoxIcon")
const alertBoxText = document.getElementById("alertBoxText")
const alertBoxSubDiv = document.getElementById("alertBoxSubDiv")

// ALERTS
class AlertsClass {
    constructor(icon, text, timeout) {
        alertBox.style.display = "flex"
        if (icon === "success") {
            alertBoxIcon.src = "https://api.iconify.design/bx/check-circle.svg?color=white"
            alertBoxSubDiv.style.backgroundColor = "#67D980"
        } else if (icon === "error") {
            alertBoxIcon.src = "https://api.iconify.design/bx/error.svg?color=white"
            alertBoxSubDiv.style.backgroundColor = "#E95E5E"
        } else {
            alertBoxIcon.src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
            alertBoxSubDiv.style.backgroundColor = "#E95E5E"
        }
        alertBoxText.innerHTML = text

        if (timeout === null || timeout === undefined) timeout = 2000

        setTimeout(deleteAlert, timeout)
    }
}

function deleteAlert() {
    alertBox.style.display = "none"
    alertBoxIcon.src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
    alertBoxText.innerHTML = "Alert"
}

export {AlertsClass}