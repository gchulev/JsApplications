
export async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json();
    return Array.from(Object.values(data));
}

export async function postData(data) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseData = [];
    responseData.push(await response.json());
    
    const resultData = {
        succeeded: true,
        data: responseData
    };

    if (response.status !== 200) {
        resultData.succeeded = false;
    } else {
        resultData.succeeded = true;
    }
    return resultData;
}