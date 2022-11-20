import { render } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';

import { showCatalogView } from './src/views/catalog.js';
import { showCreateView } from './src/views/create.js';
import { showLoginView } from './src/views/login.js';
import { showRegisterView } from './src/views/register.js';
import { showMyFurnitureView } from './src/views/myFurniture.js';
import { showDetailsView } from './src/views/details.js';
import { showEditView } from './src/views/edit.js';
import { logout } from './src/data/data.js';

const rootElm = document.querySelector('div.container');
document.querySelector('a').addEventListener('click', () => {
    Array.from(document.querySelectorAll('nav a')).forEach(bnt => bnt.classList.remove('active'))
    document.querySelector('nav a#catalogLink').classList.add('active');
});
Array.from(document.querySelectorAll('nav a')).forEach(bnt => bnt.addEventListener('click', updateButtons))

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});

page('/', renderMiddleware, showCatalogView);
page('/catalog', renderMiddleware, showCatalogView);
page('/create', renderMiddleware, showCreateView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);
page('/myFurniture', renderMiddleware, showMyFurnitureView);

page.start();
updateNav();

function renderMiddleware(ctx, next) {
    ctx.renderView = (content) => render(content, rootElm);
    ctx.updateNav = updateNav;
    ctx.updateButtons = updateButtons;
    next();
}


function updateNav() {
    const userElm = document.getElementById('user');
    const guestElm = document.getElementById('guest');
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user) {
        userElm.style.display = 'inline-block';
        guestElm.style.display = 'none';
    } else {
        userElm.style.display = 'none';
        guestElm.style.display = 'inline-block';
    }
}

function updateButtons(event) {
    const navButtons = Array.from(document.querySelectorAll('nav a'));
    navButtons.forEach(bnt => bnt.classList.remove('active'));
    event.target.classList.add('active');
}
