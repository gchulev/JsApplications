import { html } from '../../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../data/data.js';

const editItemTemplate = (item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit="${edit}">
            <input type="text" name="title" id="job-title" placeholder="Title" .value="${item.title}" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value="${item.imageUrl}" />
            <input type="text" name="category" id="job-category" placeholder="Category" .value="${item.category}" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${item.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${item.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value="${item.salary}" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

let page = null;
let itemId = null;

export async function showEditView(ctx) {
    page = ctx.page;
    itemId = ctx.params.id;
    const item = await getItemById(itemId);
    ctx.renderView(editItemTemplate(item));
}

async function edit(e) {
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);

        if (title === '' || imageUrl === '' || category === '' || description === '' || requirements === '' || salary === '') {
            throw new Error('There can be no empty fields!');
        }
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const token = userData.accessToken;
        await editItem(itemId, { title, imageUrl, category, description, requirements, salary }, token);
        page.redirect(`/details/${itemId}`);
    } catch (error) {
        alert(error.message);
        throw error;
    }
}