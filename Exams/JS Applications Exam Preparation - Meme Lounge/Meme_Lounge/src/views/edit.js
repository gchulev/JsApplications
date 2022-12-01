import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';
import { showNotification } from './notification.js';

const editTemplate = (meme, onEdit) => html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form id="edit-form" @submit=${onEdit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                            ${meme.description}
                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function showEditView(ctx) {
    const memeId = ctx.params.id;
    const meme = await getItemById(memeId);
    ctx.renderView(editTemplate(meme, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { title, description, imageUrl } = Object.fromEntries(formData);

            if (title === '' || description === '' || imageUrl === '') {
                throw new Error('Fields can not be empty!');
            }

            await editItem(memeId, { title, description, imageUrl });
            ctx.page.redirect(`/details/${meme._id}`);

        } catch (error) {
            showNotification(error.message);
            throw error;
        }
    }
}