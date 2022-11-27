import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';


const animalCardTemplate = (animal) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${animal.image}">
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${animal._id}">Details</a>
    </div>
</div>`;

const dashboardTemplate = (animals) => html`
<!--Dashboard-->
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${animals.length > 0
        ? html`${animals.map(a => animalCardTemplate(a))}`
        : html`
        <!--If there is no pets in dashboard-->
        <div>
            <p class="no-pets">No pets in dashboard</p>
        </div> `}
    </div>
</section>`;

export async function showDashboardView(ctx) {
    const animals = await getAllItems();
    ctx.renderView(dashboardTemplate(animals));
}