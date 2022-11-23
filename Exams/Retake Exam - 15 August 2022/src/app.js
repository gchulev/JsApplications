import { default as page } from '../../../node_modules/page/page.mjs';
import { render, html } from '../../../node_modules/lit-html/lit-html.js';

import { logout } from '../data/data.js';

import { showHomeView } from './views/home.js';
import { showLoginVew } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showDashboard } from './views/dashboard.js';
import { showAddPairView } from './views/addItem.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showSearchView } from './views/search.js';


const mainElm = document.querySelector('main');
document.querySelector('div.user').children[1].addEventListener('click', async () => {
    await logout(); //await this becuase we need to know if the server perfomerd successfull logout
    page.redirect('/dashboard');
    updateNav();
});

page('index.html', '/');
page('/', middleWare, showHomeView);
page('/login', middleWare, showLoginVew);
page('/register', middleWare, showRegisterView);
page('/dashboard', middleWare, showDashboard);
page('/addItem', middleWare, showAddPairView);
page('/details/:value', middleWare, showDetailsView);
page('/edit/:id', middleWare, showEditView);
page('/search', middleWare, showSearchView);
page('*', () => render(html`<h2>Resource Not Found!</h2>`, mainElm));


page.start();
updateNav();

function middleWare(ctx, next) {
    ctx.renderView = (content) => render(content, mainElm);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user) {
        document.querySelector('div.user').style.display = 'inline-block';
        document.querySelector('div.guest').style.display = 'none';
    } else {
        document.querySelector('div.guest').style.display = 'inline-block';
        document.querySelector('div.user').style.display = 'none';
    }
}

