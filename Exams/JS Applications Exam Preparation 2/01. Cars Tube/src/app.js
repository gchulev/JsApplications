import { render} from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { updateNav } from './views/nav.js';

import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showHomeView } from './views/home.js';
import { showAllListingsView } from './views/allListings.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showPersonalListingsView } from './views/personalListings.js';
import { showSearchView } from './views/search.js';
import { showCreateView } from './views/create.js';

const mainElm = document.getElementById('site-content');

page(decorateContext);
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/allListings', showAllListingsView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/personalListings', showPersonalListingsView);
page('/search', showSearchView);
page('/create', showCreateView);


updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) =>  render(content, mainElm);
    next();
}
