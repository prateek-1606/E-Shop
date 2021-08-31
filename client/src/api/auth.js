import axios from 'axios';
const URL = 'https://e-shop-api.herokuapp.com/auth'

export const login = async ({ email, password }) => {
    try {
        const res = await axios.post(`${URL}/signin`, {
            email,
            password
        })
        return res;
    }
    catch (error) {
        throw error;
    }
}

export const register = async ({ email, password, name }) => {
    try {
        const res = await axios.post(`${URL}/signup`, {
            email,
            name,
            password
        })

        return res;
    }
    catch (error) {
        throw error;
    }
}