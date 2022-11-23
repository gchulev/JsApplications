import { api } from './api.js';

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    collectibles: '/data/shoes?sortBy=_createdOn%20desc',
    shoes: '/data/shoes',
    shoeById: '/data/shoes/',
    search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22` // check this if the string has to be adjusted with more variables
}

export async function registerUser(email, password) {
    const userData = await api.post(endPoints.register, { email, password });
    return userData;
}

export async function loginUser(email, password) {
    const data = await api.post(endPoints.login, { email, password });
    return data;
}

export async function logout() {
    try {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        const result = await api.get(endPoints.logout, user.accessToken);

        if (result.status !== 204) {
            throw new Error('Unable to logout user!');
        }

        sessionStorage.removeItem('userData');

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function getItemById(id) {
    const result = await api.get(endPoints.shoeById + id);
    return result;
}

export async function getCollectibles() {
    const data = await api.get(endPoints.collectibles);
    return data;
}

export async function addItem(data, accessToken) {
    const result = await api.post(endPoints.shoes, data, accessToken);
    return result;
}

export async function editItem(id, data, accessToken) {
    const result = await api.put(endPoints.shoeById + id, data, accessToken);
    return result;
}

export async function deleteItem(id, accessToken) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const result = await api.del(endPoints.shoeById + id, user.accessToken);
    return result;
}

export async function searchItem(queryString) {
    const encodedQuery = encodeURIComponent(queryString)
    const result = await api.get(endPoints.search(encodedQuery));
    return result;
}

