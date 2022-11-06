document.addEventListener('DOMContentLoaded', onDocumentLoad);
document.getElementById('logout').addEventListener('click', onLogout);
document.querySelector('button.load').addEventListener('click', loadCaches);
document.getElementById('addForm').addEventListener('submit', addCatch);

function onDocumentLoad() {
    clearCatchesElements();
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.querySelector('p.email').lastChild.textContent = sessionStorage.getItem('userName');
        document.getElementById('logout').style.display = 'inline';
        document.querySelector('button.add').disabled = false;

    } else {
        document.getElementById('login').style.display = 'inline';
        document.getElementById('register').style.display = 'inline';
        document.querySelector('p.email').lastChild.textContent = 'guest';
        document.getElementById('logout').style.display = 'none';
        document.querySelector('button.add').disabled = true;
    }
}

async function onLogout() {
    try {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: { 'X-Authorization': token }
        });

        if (response.status !== 204) {
            throw new Error('Server error, unable to log out user!');
        }

        sessionStorage.clear();
        window.location = './index.html';

    } catch (error) {
        alert(error.message);
    }
}

async function loadCaches() {
    const response = await fetch('http://localhost:3030/data/catches', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    createCatchesElmenets(data);
}

function createCatchesElmenets(data) {
    const catchesDiv = document.getElementById('catches');
    catchesDiv.innerHTML = '';

    const items = Object.values(data).map(item => {
        const catchDiv = document.createElement('div');
        catchDiv.classList.add('catch');

        const anglerLbl = document.createElement('label');
        anglerLbl.textContent = 'Angler';

        const anglerInput = document.createElement('input');
        anglerInput.setAttribute('type', 'text');
        anglerInput.classList.add('angler');
        anglerInput.value = item.angler;

        const weightLbl = document.createElement('label');
        weightLbl.textContent = 'Weight';

        const weightInput = document.createElement('input');
        weightInput.setAttribute('type', 'text');
        weightInput.classList.add('weight');
        weightInput.value = item.weight;

        const speciesLbl = document.createElement('label');
        speciesLbl.textContent = 'Species';

        const speciesInput = document.createElement('input');
        speciesInput.setAttribute('type', 'text');
        speciesInput.classList.add('species');
        speciesInput.value = item.species;

        const locationLbl = document.createElement('label');
        locationLbl.textContent = 'Location';

        const locationInput = document.createElement('input');
        locationInput.setAttribute('type', 'text');
        locationInput.classList.add('location');
        locationInput.value = item.location;

        const baitLbl = document.createElement('label');
        baitLbl.textContent = 'Bait';

        const baitInput = document.createElement('input');
        baitInput.setAttribute('type', 'text');
        baitInput.classList.add('bait');
        baitInput.value = item.bait;

        const captureTimeLbl = document.createElement('label');
        captureTimeLbl.textContent = 'Capture Time';

        const captureTimeInput = document.createElement('input');
        captureTimeInput.setAttribute('type', 'text');
        captureTimeInput.classList.add('captureTime');
        captureTimeInput.value = item.captureTime;

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'UPDATE';
        updateBtn.classList.add('update');
        updateBtn.setAttribute('data-id', `${item._id}`);
        updateBtn.addEventListener('click', updateItem);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'DELETE';
        deleteBtn.classList.add('delete');
        deleteBtn.setAttribute('data-id', `${item._id}`);
        deleteBtn.addEventListener('click', deleteItem);

        if (sessionStorage.userId !== item._ownerId) {
            updateBtn.disabled = true;
            deleteBtn.disabled = true;
        } else {
            updateBtn.disabled = false;
            deleteBtn.disabled = false;
        }

        // Append all elements to the catchDiv

        catchDiv.appendChild(anglerLbl);
        catchDiv.appendChild(anglerInput);
        catchDiv.appendChild(weightLbl);
        catchDiv.appendChild(weightInput);
        catchDiv.appendChild(speciesLbl);
        catchDiv.appendChild(speciesInput);
        catchDiv.appendChild(locationLbl);
        catchDiv.appendChild(locationInput);
        catchDiv.appendChild(baitLbl);
        catchDiv.appendChild(baitInput);
        catchDiv.appendChild(captureTimeLbl);
        catchDiv.appendChild(captureTimeInput);
        catchDiv.appendChild(updateBtn);
        catchDiv.appendChild(deleteBtn);

        return catchDiv;
    });

    catchesDiv.replaceChildren(...items);
}

async function deleteItem() {
    const elmId = this.getAttribute('data-id');
    const token = sessionStorage.getItem('accessToken');

    const response = await fetch(`http://localhost:3030/data/catches/${elmId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': token }
    });

    if (response.status === 200 || response.status === 204) {
        this.parentElement.remove();
    }
}

async function updateItem() {
    const itemId = this.getAttribute('data-id');
    const token = sessionStorage.getItem('accessToken');
    const editElm = this.parentElement;
    const data = getCurrentItemData(editElm);

    try {
        const response = await fetch(`http://localhost:3030/data/catches/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(data)
        });

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Unable to update information!');
        }

    } catch (error) {
        alert(error.message);
    }
}

function getCurrentItemData(dataElm) {
    // const angler = dataElm.querySelector('input.angler').value;
    // const weight = Number(dataElm.querySelector('input.weight').value);
    // const species = dataElm.querySelector('input.species').value;
    // const location = dataElm.querySelector('input.location').value;
    // const bait = dataElm.querySelector('input.bait').value;
    // const captureTime = Number(dataElm.querySelector('input.captureTime').value);

    const angler = dataElm.querySelector('input.angler').value;
    const weight = dataElm.querySelector('input.weight').value;
    const species = dataElm.querySelector('input.species').value;
    const location = dataElm.querySelector('input.location').value;
    const bait = dataElm.querySelector('input.bait').value;
    const captureTime = dataElm.querySelector('input.captureTime').value;

    return {
        angler: angler,
        weight: weight,
        species: species,
        location: location,
        bait: bait,
        captureTime: captureTime
    }
}

async function addCatch(e) {
    e.preventDefault();
    try {
        const token = sessionStorage.getItem('accessToken');
        const formData = new FormData(e.target);

        let data = Object.fromEntries(formData.entries());
        // data.captureTime = Number(data.captureTime);
        // data.weight = Number(data.weight);

        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(data)
        });

        if (response.status !== 200) {
            throw new Error('Unable to create catch!');
        }

        const serverData = await response.json();
        displayCreatedCatch(serverData);
        e.target.reset();

    } catch (error) {
        alert(error.message);
    }
}

function displayCreatedCatch(inputData) {
    const catchesDiv = document.getElementById('catches');
    const catchDiv = document.createElement('div');
    catchDiv.classList.add('catch');

    const anglerLbl = document.createElement('label');
    anglerLbl.textContent = 'Angler';

    const anglerInput = document.createElement('input');
    anglerInput.setAttribute('type', 'text');
    anglerInput.classList.add('angler');
    anglerInput.value = inputData.angler;

    const weightLbl = document.createElement('label');
    weightLbl.textContent = 'Weight';

    const weightInput = document.createElement('input');
    weightInput.setAttribute('type', 'text');
    weightInput.classList.add('weight');
    weightInput.value = inputData.weight;

    const speciesLbl = document.createElement('label');
    speciesLbl.textContent = 'Species';

    const speciesInput = document.createElement('input');
    speciesInput.setAttribute('type', 'text');
    speciesInput.classList.add('species');
    speciesInput.value = inputData.species;

    const locationLbl = document.createElement('label');
    locationLbl.textContent = 'Location';

    const locationInput = document.createElement('input');
    locationInput.setAttribute('type', 'text');
    locationInput.classList.add('location');
    locationInput.value = inputData.location;

    const baitLbl = document.createElement('label');
    baitLbl.textContent = 'Bait';

    const baitInput = document.createElement('input');
    baitInput.setAttribute('type', 'text');
    baitInput.classList.add('bait');
    baitInput.value = inputData.bait;

    const captureTimeLbl = document.createElement('label');
    captureTimeLbl.textContent = 'Capture Time';

    const captureTimeInput = document.createElement('input');
    captureTimeInput.setAttribute('type', 'text');
    captureTimeInput.classList.add('captureTime');
    captureTimeInput.value = inputData.captureTime;

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'UPDATE';
    updateBtn.classList.add('update');
    updateBtn.setAttribute('data-id', `${inputData._id}`);
    updateBtn.addEventListener('click', updateItem);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('data-id', `${inputData._id}`);
    deleteBtn.addEventListener('click', deleteItem);

    if (sessionStorage.userId !== inputData._ownerId) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    } else {
        updateBtn.disabled = false;
        deleteBtn.disabled = false;
    }

    // Append all elements to the catchDiv

    catchDiv.appendChild(anglerLbl);
    catchDiv.appendChild(anglerInput);
    catchDiv.appendChild(weightLbl);
    catchDiv.appendChild(weightInput);
    catchDiv.appendChild(speciesLbl);
    catchDiv.appendChild(speciesInput);
    catchDiv.appendChild(locationLbl);
    catchDiv.appendChild(locationInput);
    catchDiv.appendChild(baitLbl);
    catchDiv.appendChild(baitInput);
    catchDiv.appendChild(captureTimeLbl);
    catchDiv.appendChild(captureTimeInput);
    catchDiv.appendChild(updateBtn);
    catchDiv.appendChild(deleteBtn);

    catchesDiv.appendChild(catchDiv);
    //return catchDiv;
}

function clearCatchesElements() {
    document.getElementById('catches').innerHTML = 'Click to load catches';
}
