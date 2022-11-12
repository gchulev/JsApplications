import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.getElementById('allCats');

const catCard = (cats) => html`
<ul>
${cats.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onToggle}>Show status code</button>
            <div class="status" style="display: none" id="100">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`)}
</ul>`;

render(catCard(cats), root);

function onToggle() {
    const elm = this.parentElement.querySelector('div.status');
    if (this.parentElement.querySelector('div.status').style.display == 'none') {
        this.parentElement.querySelector('div.status').style.display = 'block';
        this.textContent = 'Hide status code';
    } else {
        this.parentElement.querySelector('div.status').style.display = 'none';
        this.textContent = 'Show status code';
    }
}