import { clearUserData, setUserData } from '../util.js';
import { get, post } from './api.js';

export async function login(email, password) {
    const regData = await post('/users/login', { email, password });
    
    setUserData({
        _id: regData._id,
        username: regData.username,
        email: regData.email,
        gender: regData.gender,
        accessToken: regData.accessToken
    });
}

export async function register( data) {
    const regData = await post('/users/register', data);

    setUserData({
        _id: regData._id,
        username: regData.username,
        email: regData.email,
        gender: regData.gender,
        accessToken: regData.accessToken
    });
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}