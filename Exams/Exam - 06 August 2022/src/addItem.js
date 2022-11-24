import { html } from '../../../node_modules/lit-html/lit-html.js';
import { createItem } from '../data/data.js';

const createItemTemplate = () => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form class="create-form" @submit="${submitItem}">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

let page = null;

export async function showCreateView(ctx) {
    page = ctx.page;
    ctx.renderView(createItemTemplate())
}

async function submitItem(e) {
    try {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);

        if (title === '' || imageUrl === '' || category === '' || description === '' || requirements === '' || salary === '') {
            throw new Error('There can be no empty fields!');
        }
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const token = userData.accessToken;
        await createItem({ title, imageUrl, category, description, requirements, salary }, token);
        page.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}