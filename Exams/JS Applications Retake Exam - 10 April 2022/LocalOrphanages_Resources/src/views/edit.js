import { html } from '../../node_modules/lit-html/lit-html.js';
import { getPostById, editPost } from '../api/data.js';


const editTemplate = (onEdit, post) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onEdit}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value="${post.title}">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value="${post.description}">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value="${post.imageUrl}">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value="${post.address}">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value="${post.phone}">
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;

export async function showEditView(ctx) {
    const postId = ctx.params.id;
    const postData = await getPostById(postId);
    ctx.renderView(editTemplate(onEdit, postData))

    async function onEdit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const { title, description, imageUrl, address, phone } = Object.fromEntries(formData);

            if (title === '' || description === '' || imageUrl === '' || address === '' || phone === '') {
                throw new Error('All fields are mandatory!');
            }

            await editPost(postId, { title, description, imageUrl, address, phone });
            ctx.page.redirect(`/details/${postId}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}