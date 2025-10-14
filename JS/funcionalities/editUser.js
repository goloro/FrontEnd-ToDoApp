// IMPORTS
import { UserServiceClass } from "../service/userService.js"
import { AlertsClass } from "../utils/alerts.js"

// CONSTANTS
// Service
const UserService = new UserServiceClass()

// User
const user = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

// Image
const editUserIcon = document.getElementById("editUserIcon")

// Input
const editUserNameInput = document.getElementById("editUserNameInput")
const editUserEmailInput = document.getElementById("editUserEmailInput")
const editUserPasswordInput = document.getElementById("editUserPasswordInput")

// Button
const editUserButton = document.getElementById("editUserButton")
const editUserDeleteButton = document.getElementById("editUserDeleteButton")

// LOAD USER INFORMATION AT EDIT USER VIEW
loadEditUser()

// EVENT LISTENERS
editUserDeleteButton.addEventListener("click", async (e) => {
    deleteUser()
})
editUserButton.addEventListener("click", async (e) => {
    editUser()
})


// FUNCTIONS
function loadEditUser() {
    editUserIcon.src = user.icon
    editUserNameInput.value = user.username
    editUserEmailInput.value = user.email
    editUserPasswordInput.value = user.password
}

async function deleteUser() {
    const userDeleted = await UserService.deleteUser(user._id)

    if (userDeleted.successful) {
        localStorage.removeItem("TDA_USER_LOGUED")

        window.open('/FrontEnd-ToDoApp/index.html', '_self')
    } else {
        new AlertsClass("error", "User not deleted")
    }
}

async function editUser() {
    const userUpdated = await UserService.updateUser(user._id, {
        username: editUserNameInput.value,
        email: editUserEmailInput.value,
        password: editUserPasswordInput.value
    })

    if (userUpdated.successful) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(userUpdated.userData))

        new AlertsClass("success", "User updated")
    } else {
        new AlertsClass("error", "User not updated")
    }
}