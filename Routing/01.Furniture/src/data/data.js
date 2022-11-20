import { del, get, post, put } from './api.js';

const endpoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout',
    'allItems': '/data/catalog',
    'itemById': '/data/catalog/',
    'myFurniture': '/data/catalog?where=_ownerId%3D%22'
}

export async function registerUser(email, password) {
    const result = await post(endpoints.register, { email, password });
    sessionStorage.setItem('userData', JSON.stringify(result));
    return result;
}

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    sessionStorage.setItem('userData', JSON.stringify(result));
    return result;
}

export async function logout() {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const result = get(endpoints.logout, undefined, user.accessToken);
    sessionStorage.removeItem('userData');
    return result;
}

export async function createItem(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const result = await post(endpoints.allItems, data, userData.accessToken);
    return result;
}

export async function getAllItems() {
    const result = await get(endpoints.allItems);
    return result;
}

export async function getItemById(id) {
    const result = await get(endpoints.itemById + id);
    return result;
}

export async function updateItem(id, data, token) {
    const result = await put(endpoints.itemById + id, data, token);
    return result;
}

export async function deleteItem(id, token) {
    const result = await del(endpoints.itemById + id, undefined, token);
    return result;
}

export async function getMyFurniture(ownerId) {
    const idUrl = `${ownerId}%22`;
    const result = await get(endpoints.myFurniture + idUrl);
    return result;
}