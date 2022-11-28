import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';

const registerTemplate = (onRegister) => html`
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onRegister}>
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const { email, password, 'confirm-pass': repass } = Object.fromEntries(formData);

            if (email === '' || password === '' || repass === '') {
                throw new Error('All fields are required!');
            }

            if (password !== repass) {
                throw new Error('Passwords do not match!');
            }

            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/dashboard');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}