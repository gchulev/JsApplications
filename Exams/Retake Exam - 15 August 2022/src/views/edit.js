import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';

import { editItem, getItemById } from '../../data/data.js';

function editTemplate(item) {
    return html`
    <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit="${editItemData}" .itemId="${item._id}">
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value="${item.brand}" />
                <input type="text" name="model" id="shoe-model" placeholder="Model" .value="${item.model}" />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value="${item.imageUrl}" />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" .value="${item.release}" />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value="${item.designer}" />
                <input type="text" name="value" id="shoe-value" placeholder="Value" .value="${item.value}" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>`;
}

let page = null;

export async function showEditView(ctx) {
    const itemId = ctx.params.id;
    page = ctx.page;
    const item = await getItemById(itemId);

    ctx.renderView(editTemplate(item));
}

async function editItemData(evt) {
    try {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);

        const id = document.querySelector('form.edit-form').itemId;

        if (brand === '' || model === '' || imageUrl === '' || release === '' || designer === '' || value === '') {
            throw new Error('Field can not be empty!');
        }

        const user = JSON.parse(sessionStorage.getItem('userData'));
        const token = user.accessToken;

        const resultData = await editItem(id, { brand, model, imageUrl, release, designer, value }, token);
        page.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}   