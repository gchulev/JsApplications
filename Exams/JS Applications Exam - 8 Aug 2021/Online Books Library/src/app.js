import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { default as page } from '../../node_modules/page/page.mjs';
import { showAddBookView } from './views/addBook.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showLoginView } from './views/login.js';
import { showMyBooksView } from './views/myBooks.js';
import { updateNav } from './views/nav.js';
import { showRegisterView } from './views/register.js';

const mainElm = document.getElementById('site-content');

page(decorateContext);
page('index.html', '/');
page('/login', showLoginView);
page('/register', showRegisterView);
page('/addBook', showAddBookView);
page('/dashboard', showDashboardView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/myBooks', showMyBooksView);


updateNav();
page.start();

// Middleware function
function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.renderView = (content) => render(content, mainElm);
    next();
}
