const API_KEYS = 'AIzaSyBhRU3Odhgl4pFl0g7bbRT74YGPCz6XRe8'

export const authenticate = async (auth, data) => {
    try {
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${auth}?key=` + API_KEYS
        const res = await fetch(URL, {
                        body: JSON.stringify(data),
                        method: 'POST'
                    })
        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}