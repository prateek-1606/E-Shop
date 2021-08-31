import axios from 'axios';
const URL = 'https://e-shop-api.herokuapp.com/';

export const getProducts = async () => {
    try {
        const res = await axios.get(`${URL}/products`);

        return res;
    }
    catch (err) {
        throw err;
    }
}

export const AddProduct = async ({ name, description, price, Image }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post(`${URL}/products`, { name, description, price, Image }, { headers: { "Authorization": `${token}` } })
        return res;
    }
    catch (err) {
        throw err;
    }
}

export const DeleteProduct = async (id) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const res = await axios.delete(`${URL}/products/${id}`, { headers: { "Authorization": `${token}` } })

        return res;
    }
    catch (err) {
        throw err;
    }
}

export const getProduct = async (id) => {
    try {
        const res = await axios.get(`${URL}/products/${id}`);

        return res;
    }
    catch (err) {
        throw err;
    }
}

