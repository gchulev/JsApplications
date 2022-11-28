import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';


const loginTemplate = (onLogin) => html`
<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="login">
    <form id="login-form" action="" method="" @submit=${onLogin}>
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
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
                throw new Error('Email or password can not be empty!');
            }

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/dashboard');
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}