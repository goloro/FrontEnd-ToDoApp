// IMPORTS
import { UserServiceClass } from "../service/userService.js"

// CONSTANTS
// Local Storage
const logged_User = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

// Service
const UserService = new UserServiceClass()

// Text 
const userNameText = document.getElementById("userMenuNavBarName")

// Images
const userIcon = document.getElementById("userMenuNavBarUserIcon")

// FUNCTIONALITY
if (!logged_User) window.open('/FrontEnd-ToDoApp/index.html', '_self')
else {
    const request = await UserService.getById(logged_User._id)

    if (request.successful) {
        localStorage.setItem("TDA_USER_LOGUED", JSON.stringify(request.userData))

        userNameText.textContent = request.userData.username
        userIcon.src = request.userData.icon
    } else {
        window.open('/FrontEnd-ToDoApp/index.html', '_self')
        localStorage.removeItem("TDA_USER_LOGUED")
    }
}