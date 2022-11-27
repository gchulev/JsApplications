import * as api from './api.js';

const endPoints = {
'getAllItems': '/data/games?sortBy=_createdOn%20desc',
'getAllItemsSorted': '/data/games?sortBy=_createdOn%20desc&distinct=category',
'createNewItem': '/data/games',
'getItemById': '/data/games/',
'getGameComments': (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
'createComment': '/data/comments'
}

export async function getAllItems() {
    const result = await api.get(endPoints.getAllItems);
    return result;
}

export async function getAllItemsSorted() {
    const result = await api.get(endPoints.getAllItemsSorted);
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

export async function getGameComments(id) {
    const result = await api.get(endPoints.getGameComments(id));
    return result;
}

export async function createComment(data) {
    const result = await api.post(endPoints.createComment, data);
    return result;
}