// IMPORTS
import { UserServiceClass } from "../service/userService.js"
import { AlertsClass } from "../utils/alerts.js"

// CONSTANTS
// Service
const UserService = new UserServiceClass()

// User
const user = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

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

// CHECK IF USER IS LOGUED
if (user) {
    window.open('HTML/app.html', '_self')
}

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
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function handleAuthAction(actionType, data) {
    const { email, password, username } = data;

    if (!isValidEmail(email)) {
        new AlertsClass("error", "Please enter a valid email address");
        return;
    }

    let request;
    if (actionType === 'login') {
        request = await UserService.login(email, password);
    } else {
        request = await UserService.signUp({ username, email, password });
    }

    if (request.successful) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData));
        window.open('HTML/app.html', '_self');
    } else {
        const errorMessage = actionType === 'login'
            ? "Username or email aren´t correct or not registered"
            : "Username or email are already registered";

        new AlertsClass("error", errorMessage);

        // Clear inputs
        if (actionType === 'login') {
            inputLoginEmail.value = "";
            inputLoginPassword.value = "";
        } else {
            inputSignUsername.value = "";
            inputSignEmail.value = "";
            inputSignPassword.value = "";
        }
    }
}

async function login(email, password) {
    await handleAuthAction('login', { email, password });
}

async function signUp(username, email, password) {
    await handleAuthAction('signup', { username, email, password });
}