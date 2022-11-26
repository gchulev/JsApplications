import * as api from './api.js';

const endPoints = {
    'allSortedPosts': '/data/posts?sortBy=_createdOn%20desc',
    'allPosts': '/data/posts',
    'getPostById': '/data/posts/',
    'getUserPosts': (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'createDonation': '/data/donations',
    'getPostDonationCount': (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    'donationForPostFromSpecificUser': (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllItems() {
    const result = await api.get(endPoints.allSortedPosts);
    return result;
}

export async function getPostById(id) {
    const result = await api.get(endPoints.getPostById + id);
    return result;
}

export async function greatePost(data) {
    const result = await api.post(endPoints.allPosts, data);
    return result;
}

export async function editPost(id, data) {
    const result = await api.put(endPoints.getPostById + id, data);
    return result;
}

export async function deletePost(id) {
    await api.del(endPoints.getPostById + id);
}

export async function getUserPosts(userId) {
    const result = await api.get(endPoints.getUserPosts(userId));
    return result;
}

export async function donate(data) {
    const result = await api.post(endPoints.createDonation, data);
    return result;
}

export async function postDonationsTotalCount(id) {
    const result = await api.get(endPoints.getPostDonationCount(id));
    return result;
}

export async function specificUserPostDonation(postId, userId) {
    const result = await api.get(endPoints.donationForPostFromSpecificUser(postId, userId));
    return result;
}