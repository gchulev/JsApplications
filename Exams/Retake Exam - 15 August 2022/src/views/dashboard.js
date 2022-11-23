import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../../../node_modules/lit-html/directives/repeat.js';

import { getCollectibles } from '../../data/data.js';

function itemCardTemplate(item) {
    return html`
        <li class="card">
            <img src="/exams/Retake Exam - 15 August 2022/${item.imageUrl}" alt="travis" />
            <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
            </p>
            <p>
                <strong>Model: </strong><span class="model">${item.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>`;
}

function dashboardTemplate(data) {
    return html`
        <section id="dashboard">
            <h2>Collectibles</h2>
        </section>
        ${Object.keys(data).length !== 0
        ? html`
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${repeat(data, i => i._id, itemCardTemplate)}
        </ul>`
        : html`
        <!-- Display an h2 if there are no posts -->
        <h2>There are no items added yet.</h2>`
        }`;
}

let page = null;
let context = null;

export async function showDashboard(ctx) {
    page = ctx.page;
    context = ctx;
    const data = await getCollectibles();

    ctx.renderView(dashboardTemplate(data));
}