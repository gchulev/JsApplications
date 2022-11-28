import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemsForUser } from '../api/data.js';
import { getUserData } from '../util.js';


const myBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

const myBooksTemplate = (books) => html`
<!-- My Books Page ( Only for logged-in users ) -->
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0
    ? html`
    <!-- Display ul: with list-items for every user's books (if any) -->
    <ul class="my-books-list">
        ${books.map(b => myBookTemplate(b))}
    </ul>`
    : html`
    <!-- Display paragraph: If the user doesn't have his own books  -->
    <p class="no-books">No books in database!</p>`}
</section>`;

export async function showMyBooksView(ctx) {
    const user = await getUserData();
    const userOwnedBooks = await getItemsForUser(user._id)
    ctx.renderView(myBooksTemplate(userOwnedBooks));
}