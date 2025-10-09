// IMPORTS
import { StartServiceClass } from "../service/startService.js"

// CONSTANTS
const StartService = new StartServiceClass()

// START BACKEND
const request = await StartService.start()

if (request.successfull) {
    document.getElementById("loading-Screen").style.display = "none"
}