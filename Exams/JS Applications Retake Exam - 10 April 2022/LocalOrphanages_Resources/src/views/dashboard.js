import {getAllItems} from '../api/data.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const postTemplate = (post) => html`
<!-- Display a div with information about every post (if any)-->
<div class="all-posts">
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`;

const dashboardTemplate = (posts) => html`
    <!-- Dashboard -->
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        <div class="all-posts">
            ${posts.length > 0
            ? html`${posts.map(p => postTemplate(p))}` 
            : html `
        <!-- Display an h1 if there are no posts -->
        <h1 class="title no-posts-title">No posts yet!</h1>`}
        </div>
    </section>`;

export async function showDashboardView(ctx) {
    const postsData = await getAllItems();
    ctx.renderView(dashboardTemplate(postsData));
}