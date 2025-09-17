// IMPORTS
import { UserServiceClass } from '../service/userService.js'
import { AlertsClass } from '../utils/alerts.js'

// CONSTANTS
const UserService = new UserServiceClass()

const container = document.getElementById("usersContent")
const formLogin = document.getElementById("form-login")
const formRegistro = document.getElementById("form-registro")
const signUp = document.getElementById("signUp")
const signIn = document.getElementById("signIn")
const logSign = document.getElementById("logSign")

const logBTN = document.getElementById("loginBTN")
const signBTN = document.getElementById("signBTN")

const usernameSU = document.getElementById("signUSERNAME")
const emailSU = document.getElementById("signEMAIL")
const passwordSU = document.getElementById("signPASS")

// VIEW LOGIN/REGISTRO
signUp.addEventListener("click", function mostrarRegistro() {
    formRegistro.style.display = "flex"
    formLogin.style.display = "none"
    container.style.height = "77%"
    logSign.innerHTML = " Sign up"

})
signIn.addEventListener("click", function mostrarLogin() {
    formRegistro.style.display = "none"
    formLogin.style.display = "flex"
    container.style.height = "60%"
    logSign.innerHTML = " Log in"
})

// LOGIN
logBTN.addEventListener("click", async e => {
    e.preventDefault()
     
    const email = document.getElementById("loginEMAIL")
    const password = document.getElementById("loginPASS")

    const request = await UserService.login(email.value, password.value)

    if (request.successfull) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData))

        window.open('./HTML/app.html', '_self')
    } else {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Username or email aren´t correct or not registered", "#E95E5E")
        
        email.value = ""
        password.value = ""
    }
})

// SIGN UP
signBTN.addEventListener("click", async e => {
    e.preventDefault()

    /*if (!checkEmail(emailSU.value)) {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Invalid email", "#E95E5E")
        
        return
    } else if (!checkPassword(passwordSU.value)) {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Invalid password", "#E95E5E")
        
        return
    }*/

    const request = await UserService.register({
        username: usernameSU.value,
        email: emailSU.value,
        password: passwordSU.value,
        icon: null
    })
 
    if (request.successfull) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData))

        window.open('./HTML/app.html', '_self')
    } else {
        new AlertsClass("https://api.iconify.design/bx/error.svg?color=white", "Internal Error, try in a few minutes", "#E95E5E")
        clearSignUpForm()
    }
})

// FUNCTIONS
function clearSignUpForm() {
    usernameSU.value = ""
    emailSU.value = ""
    passwordSU.value = ""
}
function checkEmail(email) {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (EMAIL_REGEX.test(email)) return true

    usernameSU.value = ""
    return false
}
function checkPassword(password) {
    const PASSWORD_REGEX = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$")
    if (password.match(PASSWORD_REGEX)) return true

    passwordSU.value = ""
    return false

    /*
    At least one digit [0-9]
    At least one lowercase character [a-z]
    At least one uppercase character [A-Z]
    At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\]
    At least 8 characters in length, but no more than 32.
    */
}

// TERMINAR CHECK DE PASSWORD (poner en html un i con información de la contraseña regex)
// SI EL CORREEO YA ESTÁ REGISTRADO MANDARLE A LOGIN PONIENDO EL CORREO EN EL INPUT
// CREAR RECUPERAR CUENTA