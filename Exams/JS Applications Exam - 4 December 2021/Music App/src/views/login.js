import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js'

const loginTemplate = (onLogin) => html`
<!--Login-->
<section id="loginPage">
    <form @submit=${onLogin}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
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