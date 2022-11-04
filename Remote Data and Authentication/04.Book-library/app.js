document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
const formElm = document.querySelector('form');
formElm.addEventListener('submit', createBook);

async function loadAllBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await (response.ok ? response.json() : "Error, server response not 'OK'!");

    const items = Object.keys(data).map((key) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        tr.id = key;

        td1.textContent = data[key].title;
        td2.textContent = data[key].author;

        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click', editBook);
        deleteBtn.addEventListener('click', removeBook);

        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        return tr;
    });

    document.querySelector('tbody').replaceChildren(...items);
}

async function createBook(event) {
    event.preventDefault();

    const formData = new FormData(formElm);
    let body = Object.fromEntries([...formData.entries()]);
    formElm.reset();

    if (body.author !== '' && body.title !== '') {
        await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }

    loadAllBooks();
}

function editBook() {
    const tr = this.parentElement.parentElement;
    const currentBookId = this.parentElement.parentElement.id;
   
    const author = tr.children[1].textContent;
    const title = tr.children[0].textContent;

    const formTitleField = document.querySelector('input[name=title]');
    const formAuthorField = document.querySelector('input[name=author]');

    formTitleField.value = title;
    formAuthorField.value = author;

    const editForm = document.querySelector('form');
    
    editForm.getElementsByTagName('h3')[0].textContent = 'Edit FORM';

    const saveBtn = document.querySelector('form').getElementsByTagName('button')[0];
    saveBtn.textContent = 'Save';
    saveBtn.bookId = currentBookId;
    
    saveBtn.addEventListener('click', saveEditedData);
}

function saveEditedData(e) {
    const currentBookId = this.bookId;
    const editForm = document.querySelector('form');
    editForm.addEventListener('submit', (e) => e.preventDefault());
    let editedData = new FormData(editForm);
    editedData = Object.fromEntries(editedData);

    fetch(`http://localhost:3030/jsonstore/collections/books/${currentBookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData)
    });

    editForm.getElementsByTagName('h3')[0].textContent = 'FORM';
    const saveBtn = document.querySelector('form').getElementsByTagName('button')[0];
    saveBtn.textContent = 'Submit';
    editForm.reset();
    loadAllBooks();
}

async function removeBook() {
    const idToRemove = this.parentElement.parentElement.id;

    await fetch(`http://localhost:3030/jsonstore/collections/books/${idToRemove}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    this.parentElement.parentElement.remove();
}

