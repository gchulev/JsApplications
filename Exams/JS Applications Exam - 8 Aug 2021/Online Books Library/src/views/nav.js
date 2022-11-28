import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.getElementById('site-header');

const navTemplate = (loggedUser) => html`
<!-- Navigation -->
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/dashboard">Dashboard</a>
        ${!loggedUser
        ? html`
        <!-- Guest users -->
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>`
        : html`
        <!-- Logged-in users -->
        <div id="user">
            <span>Welcome, ${loggedUser.email}</span>
            <a class="button" href="/myBooks">My Books</a>
            <a class="button" href="/addBook">Add Book</a>
            <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
        </div>`}
    </section>
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