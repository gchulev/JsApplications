import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getUserPosts } from '../api/data.js';
import { getUserData } from '../util.js';

const myPostCardTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="../${post.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

const myPostsTemplate = (posts) => html`
<!-- My Posts -->
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${posts.length > 0 
    ? html`
    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
    ${repeat(posts, p => p._id, myPostCardTemplate)}
    </div>`
    : html`
    <!-- Display an h1 if there are no posts -->
    <h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`;

export async function showMyPostsView(ctx) {
    const user = await getUserData();
    const userId = user._id;
    const posts = await getUserPosts(userId);
    ctx.renderView(myPostsTemplate(posts))
}