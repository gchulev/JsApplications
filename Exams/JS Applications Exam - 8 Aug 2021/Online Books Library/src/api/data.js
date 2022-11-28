import * as api from './api.js';

const endPoints = {
    'createItem': '/data/books',
    'getSortedItems': '/data/books?sortBy=_createdOn%20desc',
    'getItemById': '/data/books/',
    'getItemsForUser': (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'creatLike': '/data/likes',
    'bookLikesCount' : (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    'likesOfBookFromSpecificUser': (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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
    const result = await api.post(endPoints.createItem, data);
    return result;
}

export async function editItem(id, data) {
    const result = await api.put(endPoints.getItemById + id, data);
    return result;
}

export async function deleteItem(id) {
    await api.del(endPoints.getItemById + id);
}

export async function getItemsForUser(id) {
    const result = await api.get(endPoints.getItemsForUser(id));
    return result;
}

export async function createLike(id) {
    const result = await api.post(endPoints.creatLike, { bookId: id });
    return result;
}

export async function bookLikesCount(id) {
    const result = await api.get(endPoints.bookLikesCount(id));
    return result;
}

export async function likesOfBookFromSpecificUser(bookId, userId) {
    const result = await api.get(endPoints.likesOfBookFromSpecificUser(bookId, userId));
    return result;
}