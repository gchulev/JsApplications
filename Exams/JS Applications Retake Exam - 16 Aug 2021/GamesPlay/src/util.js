export function getUserData() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
}

export function setUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}