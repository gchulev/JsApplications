function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadData);
    document.getElementById('btnCreate').addEventListener('click', createEntry);

    async function loadData() {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook');
        const data = await (response.ok === true ? response.json() : "Error in server response!");

        let liItems = Object.values(data).map(item => {
            const li = document.createElement('li');
            li.textContent = `${item.person}: ${item.phone}`;
            li.id = item._id;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener('click', deleteItem);

            li.appendChild(deleteBtn);
            return li;
        });
        const phoneBookElm = document.getElementById('phonebook');
        phoneBookElm.replaceChildren(...liItems);
    }

    async function createEntry() {
        const person = document.getElementById('person');
        const phone = document.getElementById('phone');

        if (person.value !== "" && person.value !== undefined && phone.value !== "" && phone.value !== undefined) {

            await fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'post',
                headers: { 'Content-type': 'application-json' },
                body: JSON.stringify({ person: person.value, phone: phone.value })
            });

            person.value = '';
            phone.value = '';

            loadData();
        }
    }

    async function deleteItem() {
        const itemIdToRemove = this.parentElement.id;

        const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${itemIdToRemove}`, {
            method: 'delete'
        });

        response.status === 200 ? this.parentElement.remove() : new Error("Error, operation unsuccessfull!");
    }
}

attachEvents();