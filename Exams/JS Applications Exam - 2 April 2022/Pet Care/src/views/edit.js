import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';

const editTemplate = (animal, onEdit) => html`
<!--Edit Page-->
<section id="editPage">
    <form class="editForm" @submit=${onEdit}>
        <img src="${animal.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${animal.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${animal.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${animal.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${animal.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${animal.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;

export async function showEditView(ctx) {
    const animalId = ctx.params.id;
    const animal = await getItemById(animalId);
    ctx.renderView(editTemplate(animal, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { name, breed, age, weight, image } = Object.fromEntries(formData);

            if (name === '' || breed === '' || age === '' || weight === '' || image === '') {
                throw new Error('All fields are mandatory!');
            }

            await editItem(animalId, { name, breed, age, weight, image });
            ctx.page.redirect(`/details/${animalId}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}