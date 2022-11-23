import { html } from '../../../../node_modules/lit-html/lit-html.js';

import { addItem } from '../../data/data.js';



function addItemTemplate() {
    return html`
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${creatItem}>
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
                <input type="text" name="model" id="shoe-model" placeholder="Model" />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
                <input type="text" name="value" id="shoe-value" placeholder="Value" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>`;
}

let page = null;
let context = null;

export async function showAddPairView(ctx) {
    page = ctx.page;
    context = ctx;

    ctx.renderView(addItemTemplate());
}

async function creatItem(evt) {
    try {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);

        if (brand === '') {
            throw new Error('Brand can not be empty!');
        }
        if (model === '') {
            throw new Error('Model can not be empty!');
        }
        if (imageUrl === '') {
            throw new Error('You should provide image URL');
        }
        if (release === '') {
            throw new Error('Release date can not be empty!');
        }
        if (designer === '') {
            throw new Error('Designer can not be empty!');
        }
        if (value === '') {
            throw new Error('Value can not be empty!');
        }

        const user = JSON.parse(sessionStorage.getItem('userData'));
        await addItem({ brand, model, imageUrl, release, designer, value }, user.accessToken)

        page.redirect('/dashboard');

    } catch (error) {
        alert(error.message);
    }

}