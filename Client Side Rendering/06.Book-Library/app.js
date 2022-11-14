import { html, render, nothing } from '../../node_modules/lit-html/lit-html.js';


const tableAndBtnTemplate = (showEditForm = false) => html`
<button id="loadBooks" @click=${loadAllbooks}>LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
${showEditForm
      ? editFormTemplate()
      : addFromTemplate()
    }
`;

const trTemplate = (item) => html`
<tr .id=${item._id}>
    <td>${item.title}</td>
    <td>${item.author}</td>
    <td>
        <button @click=${editBook.bind(null, item._id)}>Edit</button>
        <button @click=${removeBook.bind(null, item._id)}>Delete</button>
    </td>
</tr>
`;

const addFromTemplate = () => html`
<form id="add-form" @submit=${createBook}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
`;

const editFormTemplate = () => html`
<form id="edit-form" @submit=${updateData}>
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Save">
</form>
`;

const body = document.querySelector('body');


//Calling functions in the global scope
loadInitialView();


async function loadInitialView() {
    render(tableAndBtnTemplate(), body);
}

const tableBody = document.querySelector('tbody');

async function getBookData() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    let data = await response.json();

    if (data._id === undefined) {
        data = Object.entries(data).map(x => transformData(x));
        return data;
    }

    return Object.values(data);
}

function transformData(dataItem) {
    let resultObj = {}
    resultObj = dataItem[1];
    resultObj._id = dataItem[0];

    return resultObj;
}

async function updateData(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);

    if (data.id !== '' && data.author !== '' && data.title !== '') {
        if (data.id === 'undefined' | undefined) {
            throw new Error('id is undefined');
        }

        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${data.id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            throw new Error(`Unable to update book with id: ${id}`);
        }
        evt.target.reset();
        render(tableAndBtnTemplate(false), body);
    }
}

function editBook(id) {
    //Swapping add form with edit form here
    render(tableAndBtnTemplate(true), body);

    const currentRow = document.getElementById(id);
    const title = currentRow.children[0].textContent;
    const author = currentRow.children[1].textContent;

    //Populate edit form fields
    const editForm = document.getElementById('edit-form');
    const formAuthorElm = editForm.querySelector('input[name=author]');
    const formTitleElm = editForm.querySelector('input[name=title]');
    const formId = editForm.querySelector('input[name=id]');

    formAuthorElm.value = author;
    formTitleElm.value = title;
    formId.value = id;

}

async function removeBook(id, event) {
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    });

    if (response.status !== 200 && response.status !== 204) {
        throw new Error('Unable to delete item from the database!');
    }

    event.target.parentElement.parentElement.remove()
}

async function loadAllbooks() {
    const data = await getBookData();
    render(data.map(d => trTemplate(d)), tableBody);
}

async function createBook(evt) {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.status !== 200) {
        throw new Error('Unable to create book!');
    }

    form.reset();
    return Object.values(await response.json());
}
