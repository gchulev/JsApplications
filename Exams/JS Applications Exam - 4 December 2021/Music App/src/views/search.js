import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';
import { getUserData } from '../util.js';

const searchCardTemplate = (item, user) => html`
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

const searchTemplate = (searchItems, user, onSearch) => html`
<!--Search Page-->
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        <!--If have matches-->
        ${searchItems.length > 0
            ? html`
            ${searchItems.map(i => searchCardTemplate(i, user))}`
            : html`
           <!--If there are no matches-->
        <p class="no-result">No result.</p> `}
    </div>
</section>`;

export async function showSearchView(ctx) {
    const user = await getUserData();
    ctx.renderView(searchTemplate([], user, onSearch));
    
    async function onSearch(e) {
        e.preventDefault();
        const searchQuery = document.getElementById('search-input').value;

        if (searchQuery === '') {
            alert('Search can not be empty!');
            return;
        }
        const searchItems = await search(searchQuery);
        document.getElementById('search-input').value = '';
        ctx.renderView(searchTemplate(searchItems,user, onSearch));
    }
}