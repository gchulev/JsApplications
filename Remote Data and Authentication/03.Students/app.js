loadData();

document.getElementById('form').addEventListener('submit', async (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);
    let data = Object.fromEntries(formData.entries());
    data.grade = data.grade;
    evt.target.reset();

    if (data.firstName !== '' && data.lastName !== '' && data.facultyNumber !== '' && data.grade !== '') {
        await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    loadData();
});

async function loadData() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const outputData = await response.json();

    const tableBody = document.getElementById('results').children[1];

    let tableItems = Object.values(outputData).map(item => {
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.textContent = item.firstName;

        const td2 = document.createElement('td');
        td2.textContent = item.lastName;

        const td3 = document.createElement('td');
        td3.textContent = item.facultyNumber;

        const td4 = document.createElement('td');
        td4.textContent = Number(item.grade).toFixed(2);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        return tr;
    });
    tableBody.replaceChildren(...tableItems);
}


