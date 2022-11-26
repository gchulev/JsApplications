import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';

const registerTemplate = (onRegister) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register-page" class="auth">
    <form id="register" @submit=${onRegister}>
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister))

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { email, password, repeatPassword } = Object.fromEntries(formData);

            if (email === '' || password === '' || repeatPassword === '') {
                throw new Error('Fields can not be empty!');
            }
            if (password !== repeatPassword) {
                throw new Error('Password do not match!');
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