import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.querySelector('header');

const navTemplate = (loggedUser) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/allListings">All Listings</a>
    <a href="/search">By Year</a>
    ${!loggedUser
        ? html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
        : html`
    <!-- Logged users -->
    <div id="profile">
        <a>Welcome ${loggedUser.username}</a>
        <a href="/personalListings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a @click=${onLogout} href="/logout">Logout</a>
    </div>`}
</nav>`;

export function updateNav() {
    const loggedUser = getUserData();
    render(navTemplate(loggedUser), navRootElm);
}

async function onLogout() {
    logout();
    clearUserData();
    updateNav();
    page.redirect('/');
}