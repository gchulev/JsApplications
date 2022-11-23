const host = 'http://localhost:3030';

async function apiRequest(method, url, inputData, token) {
    const options = {
        method,
        headers: {}
    }

    options.headers['Content-Type'] = 'applications/json';

    if (inputData !== undefined) {
        options.body = JSON.stringify(inputData);
    }

    if (token !== undefined) {
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        if (response.ok === false) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const api = {
    get: (url, token) => apiRequest('get', url, undefined, token),
    post: (url, data, token) => apiRequest('post', url, data, token),
    put: (url, data, token) => apiRequest('put', url, data, token),
    del: (url, token) => apiRequest('delete', url, undefined, token)
}