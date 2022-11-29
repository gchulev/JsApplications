import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item, user, onDelete) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${item.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>
            ${user && user._id === item._ownerId
            ? html`
            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
            : nothing}
        </div>
    </div>
</section>`;


export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    const user = await getUserData();

    ctx.renderView(detailsTemplate(item, user, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this item?');

        if (confirmation) {
            await deleteItem(itemId);
            ctx.page.redirect('/catalog');
        }
    }
}
