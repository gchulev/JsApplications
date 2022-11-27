import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';

const registerTemplate = (onRegister) => html`
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="content auth">
    <form id="register" @submit=${onRegister}>
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            const { email, password, 'confirm-password': repass } = Object.fromEntries(formData);

            if (email === '' || password === '' || repass === '') {
                throw new Error('All fields are mandatory!')
            }
            if (password !== repass) {
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