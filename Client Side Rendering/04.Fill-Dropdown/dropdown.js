import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getData, postData } from './data.js';

document.querySelector('form').addEventListener('submit', addItem);
const root = document.getElementById('menu');

const template = (elements) => repeat(elements, (i) => i._id, (item) => html`<option .value=${item._id}>${item.text}</option>`);

async function addItem(event) {
    event.preventDefault();
    const formData = getFormData(event);
    const { data, succeeded} = await postData(formData);

    if (succeeded) {
        data.map(elm => allData.push(elm));
        render(template(allData), root);
    }
    event.target.reset();
}

function getFormData(event) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    return data;
}

async function loadDropdownElements() {
    const data = await getData();
    render(template(data), root);
    return data;
}

const allData = await loadDropdownElements();