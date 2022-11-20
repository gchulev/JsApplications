import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../data/data.js';

function detailsTemplate(item, userId) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="/Routing/01.Furniture${item.img.split('.')[1]}.${item.img.split('.')[2]}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            ${userId === item._ownerId
             ? html`
            <div>
                <a href='/edit/${item._id}' class="btn btn-info">Edit</a>
                <a @click=${removeItem} href=javascript:void(0) class="btn btn-red">Delete</a>
            </div>`
            : nothing }
        </div>
    </div>`;
}

let page;
let itemId;

export async function showDetailsView(ctx) {
    itemId = ctx.params.id;
    page = ctx.page;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const data = await getItemById(itemId);

    let userId;
    userId = userData === null ? userId = null : userId = userData._id;
    ctx.renderView(detailsTemplate(data, userId));
}

async function removeItem(event) {
    event.preventDefault();
    let confirmed = confirm('Are you sure you want to delete?')
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const token = userData.accessToken;

    if (confirmed) {
        await deleteItem(itemId, token);
        page.redirect('/');
    }
}