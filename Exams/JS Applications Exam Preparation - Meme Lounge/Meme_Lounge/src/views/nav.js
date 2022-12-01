import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../../node_modules/page/page.mjs';
import { logout } from '../api/user.js';
import { clearUserData, getUserData } from '../util.js';

const navRootElm = document.querySelector('nav');

const navTemplate = (loggedUser) => html`
    <a href="/allMemes">All Memes</a>
    ${loggedUser
    ? html`
    <!-- Logged users -->
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${loggedUser.email}</span>
            <a href="/userProfile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    </div>`
    : html`
    <!-- Guest users -->
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}`;

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