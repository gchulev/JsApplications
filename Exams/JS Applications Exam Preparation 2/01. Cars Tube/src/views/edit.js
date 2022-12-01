import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';

const editTemplate = (car, onEdit) => html`
<!-- Edit Listing Page -->
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onEdit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value="${car.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function showEditView(ctx) {
    const carId = ctx.params.id;
    const car = await getItemById(carId);
    ctx.renderView(editTemplate(car, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            let { brand, model, description, year, imageUrl, price } = Object.fromEntries(formData);

            if (brand === '' || model === '' || description === '' || year === '' || imageUrl === '' || price === '') {
                throw new Error('All field are required!');
            }

            year = Number(year);
            price = Number(price);

            await editItem(carId, { brand, model, description, year, imageUrl, price });
            ctx.page.redirect(`/details/${carId}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}