import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.querySelector('header');

const navTemplate = (loggedUser) => html`
<nav>
    <section class="logo">
        <img src="/images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        ${!loggedUser
        ? html`
        <!--Only Guest-->
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`
        : html`
        <!--Only Users-->
        <li><a href="/create">Create Postcard</a></li>
        <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`}
    </ul>
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