import { render } from '../node_modules/lit-html/lit-html.js';
import { default as page } from '../node_modules/page/page.mjs';
import { updateNav } from './views/nav.js';

import { showHomeView } from './views/home.js';
import { showDashboardView } from './views/dashboard.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';

const mainElm = document.getElementById('content');

page(decorateContext);
page('index.html', '/');
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
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
