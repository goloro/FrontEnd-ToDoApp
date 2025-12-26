// IMPORTS
import { StartServiceClass } from "../service/startService.js"

// CONSTANTS
const StartService = new StartServiceClass()

// START BACKEND
const MAX_RETRIES = 3;
let retries = 0;
let request = { successful: false };

while (retries < MAX_RETRIES && !request.successful) {
    if (retries > 0) {
        console.log(`Retrying backend connection... (${retries}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
    }

    try {
        request = await StartService.start();
    } catch (e) {
        console.error("Backend connection attempt failed", e);
    }

    retries++;
}

if (request.successful) {
    document.getElementById("loading-Screen").style.display = "none";
} else {
    // Ideally user should be notified here that backend is unavailable
    console.error("Failed to connect to backend after multiple attempts");
}