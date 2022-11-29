import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { updateNav } from './views/nav.js';

import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCatalogView } from './views/catalog.js';
import { showHomeView } from './views/home.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showSearchView } from './views/search.js';

const mainElm = document.getElementById('main-content');

page(decorateContext);
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/catalog', showCatalogView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/search', showSearchView);


updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) =>  render(content, mainElm);
    next();
}
