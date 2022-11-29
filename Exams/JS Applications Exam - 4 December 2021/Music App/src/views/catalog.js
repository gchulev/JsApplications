import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';
import { getUserData } from '../util.js';


const cardTemplate = (item, user) => html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${user
        ? html`
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>`
        : nothing}

    </div>
</div>`;

const catalogTemplate = (items, user) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Albums</h1>
    ${items.length > 0
    ? html`
    ${items.map(i => cardTemplate(i, user))}`
    : html`
    <!--No albums in catalog-->
    <p>No Albums in Catalog!</p>`}
</section>`;

export async function showCatalogView(ctx) {
    const user = await getUserData();
    const items = await getAllItems();
    ctx.renderView(catalogTemplate(items, user));
}