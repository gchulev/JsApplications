import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, petDonationsTotalCount, specificUserPetDonation, makeDonation } from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = async (animal, user, onDelete, onDonate, petDonationsTotalCount, specificUserPetDonation) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${animal.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${animal.name}</h1>
                <h3>Breed: ${animal.breed}</h3>
                <h4>Age: ${animal.age}</h4>
                <h4>Weight: ${animal.weight}</h4>
                <h4 class="donation">Donation: ${await petDonationsTotalCount(animal._id) * 100}$</h4>
            </div>
            ${user
            ? html`
            <!-- if there is no registered user, do not display div-->
            <div class="actionBtn">
                ${user._id === animal._ownerId
                ? html`
                <!-- Only for registered user and creator of the pets-->
                <a href="/edit/${animal._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                : html`
                ${await specificUserPetDonation(animal._id, user._id) === 0
                    ? html`
                <!--(Bonus Part) Only for no creator and user-->
                <a @click=${onDonate} id='donation-btn' href="javascript:void(0)" class="donate">Donate</a>`
                    : nothing}`}
            </div>`
            : nothing}
        </div>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const petId = ctx.params.id;
    const user = await getUserData();
    const animal = await getItemById(petId);

    // const donationInfo = await gatherDonationDetails(petId)

    ctx.renderView(await detailsTemplate(animal, user, onDelete, onDonate, petDonationsTotalCount, specificUserPetDonation));

    async function onDelete() {
        const shouldRemoveItem = window.confirm('Are you sure you want to delete this item?');
        if (shouldRemoveItem) {
            await deleteItem(animal._id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        await makeDonation(petId);
        // const donationInfo = await gatherDonationDetails(petId, user._id)
        ctx.renderView(await detailsTemplate(animal, user, onDelete, onDonate, petDonationsTotalCount, specificUserPetDonation));
    }
}
