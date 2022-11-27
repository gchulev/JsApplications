import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllItems } from '../api/data.js';

const articleTemplate = (game) => html`
<!-- Display div: with information about every game (if any) -->
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>`;

const catalogueTemplate = (games) => html`
<!-- Catalogue -->
<section id="catalog-page">
    <h1>All Games</h1>
    ${games.length > 0
    ? repeat(games, g => g._id, articleTemplate)
    : html`
    <!-- Display paragraph: If there is no games  -->
    <h3 class="no-articles">No articles yet</h3>`}
</section>`;

export async function showCatalogueView(ctx) {
    const games = await getAllItems();
    ctx.renderView(catalogueTemplate(games));
}