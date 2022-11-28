import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';


const addBookTemplate = (onCreate) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="create">
    <form id="create-form" action="" method="" @submit=${onCreate}>
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>`;

export async function showAddBookView(ctx) {
    ctx.renderView(addBookTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const { title, description, imageUrl, type } = Object.fromEntries(formData);

            if (title === '' || description === '' || imageUrl === '' || type === '') {
                throw new Error('All fields are required!');
            }

            await createItem({ title, description, imageUrl, type });
            ctx.page.redirect('/dashboard');
            
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}