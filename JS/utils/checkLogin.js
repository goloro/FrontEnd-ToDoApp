// CONSTANTS
// Local Storage
const logged_User = localStorage.getItem("TDA_USER_LOGUED")

// Text
const userNameText = document.getElementById("userMenuNavBarName")

// Images
const userIcon = document.getElementById("userMenuNavBarUserIcon")

// FUNCTIONALITY
if (!logged_User) window.open('/FrontEnd-ToDoApp/index.html', '_self')
else {
    userNameText.textContent = JSON.parse(logged_User).username
    userIcon.src = JSON.parse(logged_User).icon
}