import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (car, user, onDelete) => html`
<!-- Listing Details Page -->
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${user && user._id === car._ownerId
        ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`
        : nothing}
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const carId = ctx.params.id;
    const car = await getItemById(carId);
    const user = await getUserData();
    ctx.renderView(detailsTemplate(car, user, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this item?');

        if (confirmation) {
            await deleteItem(carId);
            ctx.page.redirect('/allListings');
        }
    }
}