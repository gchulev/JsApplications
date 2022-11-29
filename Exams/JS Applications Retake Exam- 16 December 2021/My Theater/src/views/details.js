import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { createLike, deleteItem, getItemById, getLikesForEventFromSpecificUser, getTotalTheaterLikes} from '../api/data.js'
import { getUserData } from '../util.js';

const detailsTemplate = async (item, user, onDelete, onLike) => html`
<!--Details Page-->
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${item.title}</h1>
            <div>
                <img src="${item.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${item.description}</p>
            <h4>Date: ${item.date}</h4>
            <h4>Author: ${item.author}</h4>
            <div class="buttons">
                ${user
                ?  html`${user._id === item._ownerId
                    ? html`
                    <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                    <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
                    : html`
                        ${await getLikesForEventFromSpecificUser(item._id, user._id) === 0
                        ? html `
                        <a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`
                        : nothing}
                    ` }`
                : nothing}
            </div>
            <p class="likes">Likes: ${await getTotalTheaterLikes(item._id)}</p>
        </div>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const user = await getUserData();
    const item = await getItemById(itemId, user);

    ctx.renderView(await detailsTemplate(item, user, onDelete, onLike));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this item?');

        if (confirmation) {
            await deleteItem(itemId);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike () {
        await createLike({theaterId: itemId});
        ctx.renderView(await detailsTemplate(item, user));
    }
}