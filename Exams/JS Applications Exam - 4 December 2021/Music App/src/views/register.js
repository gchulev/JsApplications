import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js'

const registerTemplate = (onRegister) => html`
<!--Registration-->
<section id="registerPage">
    <form @submit=${onRegister}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { email, password, 'conf-pass': repeatPassword } = Object.fromEntries(formData);

            if (email === '' || password === '' || repeatPassword === '') { // Check if the form fields are named the same!!!
                throw new Error('All fields are required!');
            }

            if (password !== repeatPassword) {
                throw new Error('Passwords do not match!');
            }

            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/'); // Check the task description to where to redirect!!!

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}