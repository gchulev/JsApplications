import { default as page } from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

import { showHomeView } from './src/home.js'
import { showDashBoardView } from './src/dashboard.js';
import { showLoginView } from './src/login.js';
import { logout } from './data/data.js';
import { showRegisterView } from './src/register.js';
import { showCreateView } from './src/addItem.js';
import { showDetailsView } from './src/details.js';
import { showEditView } from './src/editItem.js';

const mainElm = document.querySelector('main');
document.querySelectorAll('div.user a')[1].addEventListener('click', async () => {
    await logout();
    sessionStorage.removeItem('userData');
    updateNav();
    page.redirect('/dashboard');
});

page('index.html', '/');
page('/', middleware, showHomeView);
page('/dashboard', middleware, showDashBoardView);
page('/register', middleware, showRegisterView);
page('/login', middleware, showLoginView);
page('/details/:id', middleware, showDetailsView);
page('/addItem', middleware, showCreateView)
page('/edit/:id', middleware, showEditView);
page('*', () => html`<h3>Page not found!</h3>`);

page.start();
updateNav();

function updateNav() {
    const user = sessionStorage.getItem('userData');

    if (user) {
        document.querySelector('div.user').style.display = 'inline-block';
        document.querySelector('div.guest').style.display = 'none';
    } else {
        document.querySelector('div.user').style.display = 'none';
        document.querySelector('div.guest').style.display = 'inline-block';
    }
}

function middleware(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (context) => render(context, mainElm);
    next();
}