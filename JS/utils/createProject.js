// CONSTANTS
const backgroundInputColor = document.getElementById("selectedColorBackground")
const textInputColor = document.getElementById("selectedColorText")
const addColorBTN = document.getElementById("backgroundColorAdd")

const backgroundColorCode = document.getElementById("backgroundColorCode")
const textColorCode = document.getElementById("textColorCode")
const backgroundColorPreview = document.getElementById("backgroundColorPreview")
const textColorPreview = document.getElementById("form-np-previewDiv-text")

// VARIABLES
var backCode = backgroundInputColor.value
var textCode = textInputColor.value

// EVENT LISTENERS
backgroundInputColor.addEventListener("input", e => {
    if (checkDifferentColors()) backCode = backgroundInputColor.value
    backgroundColorCode.innerHTML = backCode
    backgroundColorPreview.style.backgroundColor = backCode
})
textInputColor.addEventListener("input", e => {
    if (checkDifferentColors()) textCode = textInputColor.value
    textColorCode.innerHTML = textCode
    textColorPreview.style.color = textCode
})
addColorBTN.addEventListener("click", e => {
        
})

// FUNCTIONS
function checkDifferentColors() {
    if (backgroundInputColor.value != textInputColor.value) return true
}