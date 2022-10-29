function getInfo() {
    const busId = document.getElementById('stopId').value;

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
        .then(response => response.json())
        .then(bussData)
        .catch(handleError);
}

function bussData(data) {
    const busStopName = data.name;
    document.getElementById('stopName').textContent = busStopName;
    const busesDiv = document.getElementById('buses');
    busesDiv.innerHTML = '';

    for (const [busNr, busTime] of Object.entries(data.buses)) {
        const li = document.createElement('li');
        li.textContent = `Bus ${busNr} arrives in ${busTime} minutes`;
        busesDiv.appendChild(li);
    }
}

function handleError(err) {
    document.getElementById('buses').innerHTML = '';
    document.getElementById('stopName').textContent = 'Error'
}