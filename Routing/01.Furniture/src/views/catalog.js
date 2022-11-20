import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { repeat } from '../../../../node_modules/lit-html/directives/repeat.js';

import { getAllItems } from '../data/data.js';


const containerTemplate = (items) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${repeat(items, x => x._id, containerInnerInfoTemplate)}
    </div>`;

const containerInnerInfoTemplate = (item) => html`

    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${`../../Routing/01.Furniture/${item.img}`} />
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


export async function showCatalogView(ctx) {
    const data = await getAllItems();
    ctx.renderView(containerTemplate(data));
    ctx.updateNav();
}