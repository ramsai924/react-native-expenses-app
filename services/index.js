const BASE_URL = 'https://react-native-expenses-7dad1-default-rtdb.firebaseio.com'

export const getExpenses = async () => {
    try {
        const res = await fetch(`${BASE_URL}/expenses.json`, {
                        method: 'GET'
                    })
        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}

export const createExpenses = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/expenses.json`, {
                        body: JSON.stringify(data),
                        method: 'POST'
                    })
        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}

export const putExpenses = async (id, data) => {
    try {
        const res = await fetch(`${BASE_URL}/expenses/${id}.json`, {
                        body: JSON.stringify(data),
                        method: 'PUT'
                    })
        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}

export const deleteExpenseData = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/expenses/${id}.json`, {
                        method: 'DELETE'
                    })
        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}