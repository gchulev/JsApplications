import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js'

const registerTemplate = (onRegister) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { email, password, 're-password': repeatPassword } = Object.fromEntries(formData);

            if (email === '' || password === '' || repeatPassword === '') { // Check if the form fields are named the same!!!
                throw new Error('All fields are required!');
            }

            if (password !== repeatPassword) {
                throw new Error('Passwords do not match!');
            }

            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/dashboard'); // Check the task description to where to redirect!!!

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}