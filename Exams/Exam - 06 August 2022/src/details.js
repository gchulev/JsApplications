import { html, nothing } from '../../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, getAllApplications, getUserApplications, apply } from '../data/data.js';

const detailsTemplate = (item, user) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="/exams/exam - 06 August 2022/${item.imageUrl.replace('..', '')}" alt="example1" />
        <p id="details-title">${item.title}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${item.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${item.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${item.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${item.applicatons}</strong></p>
        <div id="action-buttons">
            ${user !== null
        ? html`
            ${item._ownerId === user._id
            ? html`
            <!--Edit and Delete are only for creator-->
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" .itemId="${item._id}" @click="${removeItem}">Delete</a>`
            : nothing}
            <!--Bonus - Only for logged-in users ( not authors )-->
            ${item.userApplications === 0
            ? html`<a href="" id="apply-btn" @click="${applyForJob}" .itemId="${item._id}">Apply</a>`
            : nothing}`
        : nothing}
        </div>
    </div>
</section>`;

let page = null;
let context = null;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    page = ctx.page;
    context = ctx;

    const user = JSON.parse(sessionStorage.getItem('userData'));
    const itemData = await getItemById(itemId);
    itemData.applicatons = await getAllApplications(itemId);

    if (user !== null) {
        itemData.userApplications = await getUserApplications(itemId, user._id);
    }

    ctx.renderView(detailsTemplate(itemData, user))
}

async function removeItem(e) {
    try {
        const id = this.itemId;
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        await deleteItem(id, userData.accessToken);
        page.redirect('/dashboard');

    } catch (error) {
        alert(error.message);
    }
}

async function applyForJob(e) {
    const offerId = this.itemId;
    this.style.display = 'none';
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const token = user.accessToken;
    await apply({ offerId }, token);
   }