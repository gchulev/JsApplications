import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllItems } from '../api/data.js';

const bookItemTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

const dashboardTemplate = (books) => html`
<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length > 0
    ? html`
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
        ${repeat(books, b => b._id, bookItemTemplate)}
    </ul>`
    : html`
    <!-- Display paragraph: If there are no books in the database -->
    <p class="no-books">No books in database!</p>`}
</section>`;

export async function showDashboardView(ctx) {
    const books = await getAllItems();
    ctx.renderView(dashboardTemplate(books));
}