import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

const createTemplate = (onCreate) => html`
<!-- Create Listing Page -->
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onCreate}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function showCreateView(ctx) {
    ctx.renderView(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            let { brand, model, description, year, imageUrl, price } = Object.fromEntries(formData);

            if (brand === '' || model === '' || description === '' || year === '' || imageUrl === '' || price === '') {
                throw new Error('All fields are required!');
            }

            year = Number(year);
            price = Number(price);

            await createItem({ brand, model, description, year, imageUrl, price });
            ctx.page.redirect('/allListings');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}