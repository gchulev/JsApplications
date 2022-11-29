import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js'

const loginTemplate = (onLogin) => html`
<!--Login Page-->
<section id="loginaPage">
    <form class="loginForm" @submit=${onLogin}>
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
            const formData = new FormData(e.target);
            const { email, password } = Object.fromEntries(formData);

            if (email === '' || password === '') {
                throw new Error('All fields are required!');
            }

            await login( email, password );
            ctx.updateNav();
            ctx.page.redirect('/'); //Check redirection depending on the task 

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}