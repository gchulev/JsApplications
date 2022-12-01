import * as api from './api.js';

const endPoints = {
    getSortedItems: '/data/memes?sortBy=_createdOn%20desc',
    createNewItem: '/data/memes',
    getItemById: '/data/memes/',
    getUserMemes: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
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

export async function getMemesForUser(userId) {
    const result = await api.get(endPoints.getUserMemes(userId));
    return result;
}

