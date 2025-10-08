// IMPORTS
import { UserServiceClass } from "../service/userService.js"
import { AlertsClass } from "../utils/alerts.js"

// CONSTANTS
// Service
const UserService = new UserServiceClass()

// Text
const inputLoginEmail = document.getElementById("inputLoginEmail")
const inputLoginPassword = document.getElementById("inputLoginPassword")
const inputSignUsername = document.getElementById("inputSignUsername")
const inputSignEmail = document.getElementById("inputSignEmail")
const inputSignPassword = document.getElementById("inputSignPassword")

// Buttons
const loginBTN = document.getElementById("button-login")
const signBTN = document.getElementById("button-sign")
const changeFormSignUp = document.getElementById("change-signUp")
const changeFormSignIn = document.getElementById("change-login")

// Form Containers
const formsContainer = document.getElementById("form-container")
const formLogin = document.getElementById("form-login")
const formSignUp = document.getElementById("form-sign")

// EVENT LISTENERS
changeFormSignUp.addEventListener("click", () => {
    formLogin.style.display = "none"
    formSignUp.style.display = "flex"
    formsContainer.style.height = "60vh"
})
changeFormSignIn.addEventListener("click", () => {
    formLogin.style.display = "flex"
    formSignUp.style.display = "none"
    formsContainer.style.height = "50vh"
})
loginBTN.addEventListener("click", (e) => {
    e.preventDefault()
    login(inputLoginEmail.value, inputLoginPassword.value)
})
signBTN.addEventListener("click", (e) => {
    e.preventDefault()
    signUp(inputSignUsername.value, inputSignEmail.value, inputSignPassword.value)
})

// FUNCTIONS
async function login(email, password) {
    // TODO: check email with regex

    const request = await UserService.login(email, password)

    if (request.successfull) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData))

        window.open('HTML/app.html', '_self')
    } else {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Username or email aren´t correct or not registered", "#E95E5E")
        inputLoginEmail.value = ""
        inputLoginPassword.value = ""
    }
}

async function signUp(username, email, password) {
    // TODO: check email with regex

    const request = await UserService.signUp({username: username, email: email, password: password})

    if (request.successfull) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData))

        window.open('HTML/app.html', '_self')
    } else {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Username or email are already registered", "#E95E5E")
        inputSignUsername.value = ""
        inputSignEmail.value = ""
        inputSignPassword.value = ""
    }
}

// EXPORTS