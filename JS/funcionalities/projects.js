// IMPORTS
import { ProjectServiceClass } from "../service/projectService.js"
import { AlertsClass } from '../utils/alerts.js'
import { hideAll, showProjects, showWorkArea } from '../utils/menu.js';

// CONSTANTS
// Service
const projectService = new ProjectServiceClass()

// User
const user = JSON.parse(localStorage.getItem("TDA_USER_LOGUED"))

// EVENT LISTENER

// FUNCTIONS