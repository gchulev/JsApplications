import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { addLike, deleteItem, getItemById, getTotalAlbumLikes, getUserLikesForSpecificAlbum } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = async (item, user, onDelete, onLike) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${item.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${await getTotalAlbumLikes(item._id)}</span></div>
        ${user
        ? html`
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${user._id === item._ownerId 
            ? html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            : html`
                ${await getUserLikesForSpecificAlbum(item._id, user._id) === 0
                ? html`
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
                : nothing}
            `}
        </div>`
        : nothing}
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);

    const user = await getUserData();

    ctx.renderView(await detailsTemplate(item, user, onDelete, onLike));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to remove this item?');
        if (confirmation) {
            await deleteItem(itemId);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike() {
        await addLike(itemId);
        ctx.renderView(await detailsTemplate(item, user, onDelete, onLike))
    }
}