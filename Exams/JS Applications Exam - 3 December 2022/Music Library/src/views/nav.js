import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

//TODO: Put navigation root element here
const navRootElm = document.querySelector('header');

const navTemplate = (loggedUser) => html`
<a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="" /></a>

<nav>
    <div>
        <a href="/dashboard">Dashboard</a>
    </div>

    ${loggedUser
    ? html`
    <!-- Logged-in users -->
    <div class="user">
        <a href="/create">Add Album</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>`
    : html`
    <!-- Guest users -->
    <div class="guest">
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
    page.redirect('/dashboard');
}