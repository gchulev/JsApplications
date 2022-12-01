import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = (meme, user, onDelete) => html`
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${user && user._id === meme._ownerId
            ? html`
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
            : nothing}
        </div>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const memeId = ctx.params.id;
    const meme = await getItemById(memeId);
    const user = await getUserData();
    ctx.renderView(detailsTemplate(meme, user, onDelete));

    async function onDelete(e) {
        e.preventDefault();
        const confirmation = confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            await deleteItem(memeId);
            ctx.page.redirect('/allMemes');
        }
    }
}