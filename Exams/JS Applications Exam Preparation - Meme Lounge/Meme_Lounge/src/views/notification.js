import { html, render } from '../../node_modules/lit-html/lit-html.js';

export const notificationElm = document.getElementById('notifications');

const notificationTemplate = (message) => html`
<div id="errorBox" class="notification">
    <span>${message}</span>
</div>`;

export function showNotification(msg) {
    render(notificationTemplate(msg), notificationElm);
    
    document.getElementById('errorBox').style.display = 'block';
    
    setTimeout(() => document.getElementById('errorBox').style.display = 'none', 3000);
}
