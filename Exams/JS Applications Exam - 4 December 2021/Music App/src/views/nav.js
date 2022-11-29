import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.querySelector('header');

const navTemplate = (loggedUser) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/">Home</a>
    <ul>
        <!--All user-->
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        ${!loggedUser 
        ? html`
        <!--Only guest-->
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`
        : html`
        <!--Only user-->
        <li><a href="/create">Create Album</a></li>
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