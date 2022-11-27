import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';

const editTemplate = (game, onEdit) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onEdit}>
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${game.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${game.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${game.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function showEditView(ctx) {
    const gameId = ctx.params.id;
    const game = await getItemById(gameId)
    ctx.renderView(editTemplate(game, onEdit));

    async function onEdit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const { title, category, maxLevel, imageUrl, summary } = Object.fromEntries(formData);

            if (title === '' || category === '' || maxLevel === '' || imageUrl === '' || summary === '') {
                throw new Error('All fields are mandatory!');
            }

            await editItem(gameId, { title, category, maxLevel, imageUrl, summary });
            ctx.page.redirect(`/details/${gameId}`)

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}