import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getItemById, deleteItem, getGameComments, createComment} from '../api/data.js';
import { getUserData } from '../util.js';

const commentTemplate = (comment) => html`
<!-- list all comments for current game (If any) -->
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

const detailsTemplate = (game, user, onDelete, comments, onCreateComment) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>
        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length >0 
            ? html`
            <ul>
                ${repeat(comments, c => c._id, commentTemplate)}
            </ul>`
            : html`
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>`}
        </div>
        ${user 
        ? html`
        ${user._id === game._ownerId
        ? html`
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`
        : html`
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${onCreateComment}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`}
    </div>`
        : nothing}
</section>`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const game = await getItemById(itemId);
    const user = await getUserData();
    const comments = await getGameComments(itemId);
    ctx.renderView(detailsTemplate(game, user, onDelete, comments, onCreateComment));

    async function onDelete() {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            await deleteItem(itemId);
            ctx.page.redirect('/');
        }
    }
    
    async function onCreateComment(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const {comment} = Object.fromEntries(formData);
            const commentObj = {
                gameId: itemId,
                comment
            }
            e.target.reset();
            await createComment(commentObj);
            ctx.page.redirect(`/details/${itemId}`);
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}
