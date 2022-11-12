import { html, render } from '../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const form = document.querySelector('.content');
form.addEventListener('submit', getFormValues);


function getFormValues(evt) {
    evt.preventDefault();
    const formData = new FormData(form);
    let { towns } = Object.fromEntries(formData.entries());
    towns = towns.split(', ');
    
    render(townsTemplate(towns), root);
}

const townsTemplate = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>`;

