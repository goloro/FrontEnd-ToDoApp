// CONSTANTS
const logoutBTN = document.getElementById("logoutBTN")

logoutBTN.addEventListener("click", e => {
    localStorage.removeItem("TDA_USER_LOGUED")
    window.open('../../index.html', '_self')
})