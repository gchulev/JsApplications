import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../../../node_modules/lit-html/directives/repeat.js';

import { getMyFurniture } from '../data/data.js';

function myFurnitureCardTemplate(item) {
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="./Routing/01.Furniture${item.img.split('.')[1]}.${item.img.split('.')[2]}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${item._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`;
}

function myFurnitureTemplate(data) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${repeat(data, i => i._id, myFurnitureCardTemplate)}
    </div>
    `;
}

export async function showMyFurnitureView(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const data = await getMyFurniture(user._id);
    ctx.renderView(myFurnitureTemplate(data));
}