// IMPORTS
import { StartServiceClass } from "../service/startService.js"

// CONSTANTS
const StartService = new StartServiceClass()

// START BACKEND
const request = await StartService.start()

if (request.successful) {
    document.getElementById("loading-Screen").style.display = "none"
} else {
    request = await StartService.start()
}