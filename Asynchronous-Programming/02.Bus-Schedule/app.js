function solve() {
    let busId = 'depot';
    let stopName = '';


    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busId}`)
            .then(response => response.json())
            .then(handleData)
            .catch(error => console.log(error));


        function handleData(data) {
            document.querySelector('span[class="info"]').textContent = `Next stop ${data.name}`;
            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = false;
            busId = data.next;
            stopName = data.name;
        }
    }

    function arrive() {
        document.querySelector('span[class="info"]').textContent = `Arriving at ${stopName}`;
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();