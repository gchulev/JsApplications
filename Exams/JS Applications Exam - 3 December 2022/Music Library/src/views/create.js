import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

const createTemplate = (onCreate) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form class="create-form" @submit=${onCreate}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function showCreateView(ctx) {
    ctx.renderView(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);

            if (singer === '' || album === '' || imageUrl === '' || release === '' || label === '' || sales === '') {
                throw new Error('All fields are required!');
            }

            await createItem({ singer, album, imageUrl, release, label, sales });
            ctx.page.redirect('/dashboard');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}