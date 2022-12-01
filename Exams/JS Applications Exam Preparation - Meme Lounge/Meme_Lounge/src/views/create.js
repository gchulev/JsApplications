import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';
import { showNotification } from './notification.js';

const createTemplate = (onCreate) => html`
<!-- Create Meme Page ( Only for logged users ) -->
<section id="create-meme">
    <form id="create-form" @submit=${onCreate}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export async function showCreateView(ctx) {
    ctx.renderView(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { title, description, imageUrl } = Object.fromEntries(formData);

            if (title === '' || description === '' || imageUrl === '') {
                throw new Error('All fields are required!');
            }

            await createItem({ title, description, imageUrl });
            ctx.page.redirect('/allMemes');
        } catch (error) {
            showNotification(error.message);
        }
    }
}