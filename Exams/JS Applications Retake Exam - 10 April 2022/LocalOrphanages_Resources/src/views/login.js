import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';

const loginTemplate = (onLogin) => html`
<!-- Login Page (Only for Guest users) -->
<section id="login-page" class="auth">
    <form id="login" @submit=${onLogin}>
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>`;

export async function showLoginView(ctx) {
    ctx.renderView(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {

            if (email === '' || password === '') {
                throw new Error('Username or password can not be empty!');
            }

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message);
        }
    }
}