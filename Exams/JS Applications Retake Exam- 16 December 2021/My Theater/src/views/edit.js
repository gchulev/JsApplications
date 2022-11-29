import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js'

const editTemplate = (item, onEdit) => html`
<!--Edit Page-->
<section id="editPage">
    <form class="theater-form" @submit=${onEdit}>
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value="${item.title}">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${item.date}">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value="${item.author}">
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description">${item.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="${item.imageUrl}">
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`;

export async function showEditView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    ctx.renderView(editTemplate(item, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { title, date, author, description, imageUrl } = Object.fromEntries(formData);

            if (title === '' || date === '' || description === '' || author === '' || imageUrl === '') {
                throw new Error('All fields are required!');
            }

            await editItem(itemId, { title, date, author, description, imageUrl });
            ctx.page.redirect(`/details/${itemId}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}