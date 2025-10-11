// CONSTANTS
const MAIN_URL = "https://backend-todoapp-m30z.onrender.com"

// REQUEST HANDLER
class RequestHandlerClass {
    constructor() {}

    // Get Default
    async getDefault(url) {
        const res = await fetch(MAIN_URL + url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json'}
        })

        return await res.json()
    }

    // Post Default
    async postDefault(url, data) {
        const res = await fetch(MAIN_URL + url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        return await res.json()
    }

    // Put Default
    async putDefault(url, data) {
        const res = await fetch(MAIN_URL + url, {
            method: 'PUT', 
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
        return await res.json()
    }

    // Delete Default
    async deleteDefault(url) {
        const res = await fetch(MAIN_URL + url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        })
        return await res.json()
    }
}

export {RequestHandlerClass}