import * as api from './api.js';

const endPoints = {
    'getSortedItems': '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    'getAllItems': '/data/pets',
    'createNewItem': '/data/pets/',
    'getItemById': '/data/pets/',
    'addDonation': '/data/donation',
    'totalDonationsCountForPet': (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    'donationForAPetForspecificUser': (idOfPet, userId) => `/data/donation?where=petId%3D%22${idOfPet}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function makeDonation(animalId) {
    const petId = animalId;
    const result = await api.post(endPoints.addDonation, { petId });
    return result;
}

export async function petDonationsTotalCount(id) {
    const result = await api.get(endPoints.totalDonationsCountForPet(id));
    return result;
}

export async function specificUserPetDonation(petId, userId) {
    const result = await api.get(endPoints.donationForAPetForspecificUser(petId, userId));
    return result;
}