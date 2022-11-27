import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';


const loginTemplate = (onLogin) => html`
<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="auth">
    <form id="login" @submit=${onLogin}>

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export async function showLoginView(ctx) {
    ctx.renderView(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { email, password } = Object.fromEntries(formData);

            if (email === '' || password === '') {
                throw new Error('Fields can not be empty!');
            }

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}