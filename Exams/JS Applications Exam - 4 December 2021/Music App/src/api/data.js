import * as api from './api.js';

const endPoints = {
    getSortedItems: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    createNewItem: '/data/albums',
    getItemById: '/data/albums/',
    searchData: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
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

export async function search(query) {
    const result = await api.get(endPoints.searchData(query));
    return result;
}

