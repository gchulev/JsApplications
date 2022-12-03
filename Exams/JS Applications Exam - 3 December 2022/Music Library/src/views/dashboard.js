import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';


const dashBoardCardTemplate = (item) => html`
<li class="card">
    <img src="${item.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${item.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</li>`;

const dashboardTemplate = (items) => html`
<!-- Dashboard page -->
<section id="dashboard">
    <h2>Albums</h2>
    ${items.length > 0
        ? html`
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        ${items.map(dashBoardCardTemplate)}
    </ul>`
            : html`
    <!-- Display an h2 if there are no posts -->
    <h2>There are no albums added yet.</h2>`}
</section>`;

export async function showDashBoardView(ctx) {
    const items = await getAllItems();
    ctx.renderView(dashboardTemplate(items));
}