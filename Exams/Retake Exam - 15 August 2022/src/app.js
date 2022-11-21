import { default as page } from '../../../node_modules/page/page.mjs';
import { render } from '../../../node_modules/lit-html/lit-html.js';

import { showHomeView } from './views/home.js';


const mainElm = document.querySelector('main');

page('index.html', '/');
page('/', middleWare, showHomeView);

page.start();


function middleWare(ctx, next) {
    ctx.renderView = (content) => render(content, mainElm);
    next();
}