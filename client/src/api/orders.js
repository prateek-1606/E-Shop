const URL = "https://e-shop-api.herokuapp.com/order";
const axios = require('axios');

export const getOrders = async () => {
    try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`${URL}`, { headers: { "Authorization": `${token}` } });
        return res;
    }
    catch (err) {
        throw err;
    }
}

export const AddOrder = async ({ cart, OrderID, address }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post(`${URL}`, { cart, OrderID, address }, { headers: { "Authorization": `${token}` } });

        return res;
    }
    catch (err) {
        throw err;
    }
}

export const getOrder = async (id) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`${URL}/${id}`, { headers: { "Authorization": `${token}` } })
        return res;
    }
    catch (err) {
        throw err;
    }
}