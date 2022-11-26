import { html, render, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getPostById, deletePost, donate , postDonationsTotalCount, specificUserPostDonation } from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = async (post, user, onDelete, onDonate) => html`
<!-- Details Page -->
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="../${post.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${await postDonationsTotalCount(post._id)}</p>

                ${user
                    ? html`
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        ${user._id === post._ownerId
                        ? html`
                        <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                        <a @click=${onDelete} href="Javascript:void(0)" class="delete-btn btn">Delete</a>`
                        : html`
                            ${await specificUserPostDonation(post._id, user._id) === 0
                            ? html`
                            <!--Bonus - Only for logged-in users ( not authors )-->
                            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
                            : nothing}
                        `}
                        </div>`
                    : nothing}
            </div>
        </div>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const itemId = ctx.params.id;
    const post = await getPostById(itemId);
    const user = getUserData();

    ctx.renderView(await detailsTemplate(post, user, onDelete, onDonate));

    async function onDelete() {
        const confirmDelete = window.confirm('Are you sure you wnat to delete this item?');
        if (confirmDelete) {
            await deletePost(itemId);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        const data = {
            postId: post._id
        }
        await donate(data);
        
        ctx.renderView(await detailsTemplate(post, user));
    }
}
