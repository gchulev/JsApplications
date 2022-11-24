import { api } from './api.js';

const endPoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
    'sortedItems': '/data/offers?sortBy=_createdOn%20desc',
    'createItem': '/data/offers',
    'getItemById': '/data/offers/',
    'getTotalApplications': (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    'postApplication': '/data/applications',
    'getUserApplications': (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function login(email, password) {
    const userData = await api.post(endPoints.login, { email, password });
    return userData;
}

export async function register(email, password) {
    const userData = await api.post(endPoints.register, { email, password });
    return userData;
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

export async function getAllItems() {
    const result = await api.get(endPoints.sortedItems);
    return result;
}

export async function getItemById(id) {
    const result = await api.get(endPoints.getItemById + id);
    return result;
}

export async function createItem(data, token) {
    const createdItem = await api.post(endPoints.createItem, data, token);
    return createdItem;
}

export async function editItem(id, data, token) {
    const editedItem = await api.put(endPoints.getItemById + id, data, token)
    return editedItem;
}

export async function deleteItem(id, token) {
    const result = await api.del(endPoints.getItemById + id, token);
    return result;
}

export async function getAllApplications(offerId) {
    const applicatonsCount = await api.get(endPoints.getTotalApplications(offerId));
    return applicatonsCount;
}

export async function getUserApplications(offerId, userId) {
    const userApplications = await api.get(endPoints.getUserApplications(offerId, userId));
    return userApplications;
}

export async function apply(offerId, token) {
    const result = await api.post(endPoints.postApplication, offerId, token);
    return result;
}