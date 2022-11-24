const host = 'http://localhost:3030';


async function request(method, url, inputData, token) {
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'applications/json' },
        }

        if (inputData !== undefined) {
            options.body = JSON.stringify(inputData);
        }
        if (token !== undefined) {
            options.headers['X-Authorization'] = token;
        }

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
    get: (url, token) => request('get', url, undefined, token),
    post: (url, data, token) => request('post', url, data, token),
    put: (url, data, token) => request('put', url, data, token),
    del: (url, token) => request('delete', url, undefined, token)
}