import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';

import { deleteItem, getItemById } from '../../data/data.js';


function detailsTemplate(item, isOwner) {
    return html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="/exams/Retake Exam - 15 August 2022/${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${item.brand}</span></p>
                <p>
                    Model: <span id="details-model">${item.model}</span>
                </p>
                <p>Release date: <span id="details-release">${item.release}</span></p>
                <p>Designer: <span id="details-designer">${item.designer}</span></p>
                <p>Value: <span id="details-value">${item.value}</span></p>
            </div>
    
            <!--Edit and Delete are only for creator-->
            ${isOwner
            ? html`<div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click="${removeItem}" href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
            : nothing}
        </div>
    </section>`;
}

let itemId = null;
let page = null;

export async function showDetailsView(ctx) {
    itemId = ctx.params.value;
    page = ctx.page;

    const itemData = await getItemById(itemId);
    const owner = isOwner(itemData._ownerId);
    ctx.renderView(detailsTemplate(itemData, owner));
}

function isOwner(itemOwnerId) {
    const loggedUser = JSON.parse(sessionStorage.getItem('userData'));
    if (loggedUser === null || loggedUser === undefined) {
        return false;
    }
    const loggedUserId = loggedUser._id;

    if (itemOwnerId === loggedUserId) {
        return true;
    }
    return false;
}

async function removeItem() {
    await deleteItem(itemId);
    page.redirect('/dashboard');
}