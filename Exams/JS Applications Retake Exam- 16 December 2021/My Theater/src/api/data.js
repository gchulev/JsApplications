import * as api from './api.js';

const endPoints = {
    'getSortedItems': '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    'createNewItem': '/data/theaters',
    'getItemById': '/data/theaters/',
    'userTheaters': (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'createLike': '/data/likes',
    'totalTheaterLikes': (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    'getLikesOfEventForSpecificUser': (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count` 
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

export async function getUserTheaters(id) {
    const result = await api.get(endPoints.userTheaters(id));
    return result;
}

export async function createLike(data) {
    const result = await api.post(endPoints.createLike, data);
    return result;
}

export async function getTotalTheaterLikes(id) {
    const result = await api.get(endPoints.totalTheaterLikes(id));
    return result;
}

export async function getLikesForEventFromSpecificUser(eventId, userId) {
    const result = await api.get(endPoints.getLikesOfEventForSpecificUser(eventId, userId));
    return result;
}
