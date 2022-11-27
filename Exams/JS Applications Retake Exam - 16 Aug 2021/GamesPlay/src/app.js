import { default as page } from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { updateNav } from './views/nav.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCatalogueView } from './views/catalogue.js';
import { showHomeView } from './views/home.js';
import { showCreateGameView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';

const mainElm = document.getElementById('main-content');

page(decorateContext);
page('index.html', '/');
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/catalogue', showCatalogueView);
page('/create', showCreateGameView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);


updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) => render(content, mainElm);
    next();
}
