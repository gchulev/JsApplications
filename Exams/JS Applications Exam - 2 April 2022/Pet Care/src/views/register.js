import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';

const registerTemplate = (onRegister) => html`
<!--Register Page-->
<section id="registerPage">
    <form class="registerForm" @submit=${onRegister}>
        <img src="/images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { email, password, repeatPassword } = Object.fromEntries(formData);

            if (email === '' || password === '' || repeatPassword === '') {
                throw new Error('All field must be filled in!');
            }

            if (password !== repeatPassword) {
                throw new Error('Passwords do not match!');
            }

            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}