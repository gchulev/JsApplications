import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllItems } from '../api/data.js';

const memeCardTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

const allMemesTemplate = (memes) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0 
        ? html`
        <!-- Display : All memes in database ( If any ) -->
        ${repeat(memes, m => m._id, memeCardTemplate)}`
        : html`
        <!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>`}
    </div>
</section>`; 

export async function showAllMemesView(ctx) {
    const memes = await getAllItems();
    ctx.renderView(allMemesTemplate(memes));
}