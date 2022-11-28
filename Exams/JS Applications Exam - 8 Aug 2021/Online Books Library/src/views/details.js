import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, createLike, bookLikesCount, likesOfBookFromSpecificUser } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, user, bookLikes, userLikes, onDelete, onLike) => html`
<!-- Details Page ( for Guests and Users ) -->
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${user
        ? html`
            ${user._id === book._ownerId
                ? html`
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                : html`
            ${userLikes === 0
                        ? html`
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>`
                        : nothing}`}`
        : nothing}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${bookLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const bookId = ctx.params.id;
    const book = await getItemById(bookId);

    const user = await getUserData();
    const bookLikes = await bookLikesCount(bookId);
    let userLikes = 0;
    if (user) {
        userLikes = await likesOfBookFromSpecificUser(bookId, user._id);
    } else {
        userLikes = undefined;
    }

    ctx.renderView(detailsTemplate(book, user, bookLikes, userLikes, onDelete, onLike,));

    async function onDelete() {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            await deleteItem(bookId);
            ctx.page.redirect(`/dashboard`);
        }
    }

    async function onLike() {
        await createLike(bookId);
        const bookLikes = await bookLikesCount(bookId);
        const userLikes = await likesOfBookFromSpecificUser(bookId, user._id);
        ctx.renderView(detailsTemplate(book, user, bookLikes, userLikes));
    }
}