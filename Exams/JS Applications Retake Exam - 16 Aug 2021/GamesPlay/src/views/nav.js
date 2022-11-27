import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.querySelector('header');

//TODO: Put navigation template here
const navTemplate = (loggedUser) => html`
<!-- Navigation -->
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalogue">All games</a>
    ${loggedUser
    ? html`
    <!-- Logged-in users -->
    <div id="user">
        <a href="/create">Create Game</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>`
    : html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
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