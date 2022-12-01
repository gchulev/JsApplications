import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { updateNav } from './views/nav.js';

import { showHomeview } from './views/home.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCreateView } from './views/create.js';
import { showAllMemesView } from './views/allMemes.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showUserProfileView } from './views/userProfile.js';

const mainElm = document.querySelector('main');


page(decorateContext);
page('/', showHomeview);
page('/allMemes', showAllMemesView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/userProfile', showUserProfileView);


updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) => render(content, mainElm);
    next();
}

