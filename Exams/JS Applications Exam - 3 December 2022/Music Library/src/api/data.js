import * as api from './api.js';

const endPoints = {
    getSortedItems: '/data/albums?sortBy=_createdOn%20desc',
    createNewItem: '/data/albums',
    getItemById: '/data/albums/',
    addLike: '/data/likes',
    totalAlbumLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    userSpecificAlbumLikes: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function addLike(id) {
    const result = await api.post(endPoints.addLike, { albumId: id });
    return result;
}

export async function getTotalAlbumLikes(albumId) {
    const result = await api.get(endPoints.totalAlbumLikes(albumId));
    return result;
}

export async function getUserLikesForSpecificAlbum(albumId, userId) {
    const result = await api.get(endPoints.userSpecificAlbumLikes(albumId, userId));
    return result;
}