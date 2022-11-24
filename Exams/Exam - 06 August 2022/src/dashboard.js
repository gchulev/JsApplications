import { html } from '../../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

import { getAllItems } from '../data/data.js';


const itemCardTemplate = (item) => html`
<!-- Display a div with information about every post (if any)-->
<div class="offer">
    <img src="/exams/exam - 06 August 2022/${item.imageUrl.replace('..', '')}" alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${item.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</div>`;

const dashboardTemplate = (items) => html`
<!-- Dashboard page -->
<section id="dashboard">
    <h2>Job Offers</h2>
    ${Object.keys(items).length > 0
    ? repeat(items, i => i.id, itemCardTemplate)
    : html`
    <!-- Display an h2 if there are no posts -->
    <h2>No offers yet.</h2>`}
</section>`;

export async function showDashBoardView(ctx) {
    const items = await getAllItems();
    ctx.renderView(dashboardTemplate(items));
}