import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';

const editTemplate = (item, onEdit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${item.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${item.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${item.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${item.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${item.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${item.sales} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function showEditView(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    ctx.renderView(editTemplate(item, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);

            if (singer === '' || album === '' || imageUrl === '' || release === '' || label === '' || sales === '') {
                throw new Error('All fields are required!');
            }

            await editItem(itemId, { singer, album, imageUrl, release, label, sales });
            ctx.page.redirect(`/details/${item._id}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}