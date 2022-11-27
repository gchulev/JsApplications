import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';


const loginTemplate = (onLogin) => html`
<!--Login Page-->
<section id="loginPage">
    <form class="loginForm" @submit=${onLogin}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`;

export async function showLoginView(ctx) {
    ctx.renderView(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();

        try {
            const fromData = new FormData(e.target);
            const { email, password } = Object.fromEntries(fromData);

            if (email === '') {
                throw new Error('Email should not be empty!');
            }
            if (password === '') {
                throw new Error('Password field can not be empty!');
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
