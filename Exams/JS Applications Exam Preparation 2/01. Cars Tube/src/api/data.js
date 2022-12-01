import * as api from './api.js';

const endPoints = {
getSortedItems: '/data/cars?sortBy=_createdOn%20desc',
getItemById: '/data/cars/',
createNewItem: '/data/cars',
getCarsForUser: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
getSearchResults: (query) => `/data/cars?where=year%3D${query}`
}

export async function getAllItems() {
    const result = await api.get(endPoints.getSortedItems);
    return result;
}

export async function getItemById(id) {
    const result = await api.get(endPoints.getItemById + id);
    return result;
}

export async function createItem(data) {
    const result = await api.post(endPoints.createNewItem, data);
    return result;
}

export async function editItem(id, data) {
    const result = await api.put(endPoints.getItemById + id, data);
    return result;
}

export async function deleteItem(id) {
    await api.del(endPoints.getItemById + id);
}

export async function getUserCars(userId) {
    const result = await api.get(endPoints.getCarsForUser(userId));
    return result;
}

export async function search(query) {
    const result = await api.get(endPoints.getSearchResults(query));
    return result;
}

