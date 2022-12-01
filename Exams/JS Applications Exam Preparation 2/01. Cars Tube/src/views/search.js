import { html } from '../../node_modules/lit-html/lit-html.js';
import {search } from '../api/data.js';

const listingTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

const searchTemplate = (cars, onSearch) => html`
<!-- Search Page -->
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${cars.length > 0
            ? html`
        <!-- Display all records -->
        ${cars.map(listingTemplate)}`
            : html`
        <!-- Display if there are no matches -->
        <p class="no-cars"> No results.</p>`}
    </div>
</section>`;

export async function showSearchView(ctx) {
    ctx.renderView(searchTemplate([], onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const searchData = Number(document.getElementById('search-input').value);

        if (searchData === 0 || !Number.isInteger(searchData)) {
           return alert('Search can not be empty. And it should be a whole number!');
        }

        const searchResult = await search(searchData);
        document.getElementById('search-input').value = '';
        ctx.renderView(searchTemplate(searchResult, onSearch));
    }
}