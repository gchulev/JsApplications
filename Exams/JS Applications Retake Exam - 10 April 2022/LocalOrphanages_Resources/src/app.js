import * as api from './api/user.js';
import { default as page } from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { updateNav } from './views/nav.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showCreateView } from './views/createPost.js';
import { showEditView } from './views/edit.js';
import { showMyPostsView } from './views/myPosts.js';

const mainElm = document.getElementById('main-content');

page(decorateContext);
page('/', showDashboardView);
page('/myPosts', showMyPostsView);
page('/createPost', showCreateView);
page('/login',decorateContext, showLoginView);
page('/register', showRegisterView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);

updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) =>  render(content, mainElm);
    next();
}
