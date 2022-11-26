import { render, html} from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const headerElm = document.querySelector('header');

const navTemplate = (loggedUser) => html`
<nav>
    <!-- Navigation -->
    <h1><a href="/">Orphelp</a></h1>
    <a href="/">Dashboard</a>
    ${loggedUser ? html`
    <!-- Logged-in users -->
    <div id="user">
        <a href="/myPosts">My Posts</a>
        <a href="/createPost">Create Post</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>`
    : html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export function updateNav(){
    const loggedUser = getUserData();
    render(navTemplate(loggedUser), headerElm);
}

async function onLogout(){
    logout();
    clearUserData();
    updateNav();
    page.redirect('/');
}