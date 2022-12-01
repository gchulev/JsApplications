import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js'

const registerTemplate = (onRegister) => html`
<!-- Register Page -->
<section id="register">
    <div class="container">
        <form id="register-form" @submit=${onRegister}>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { username, password, repeatPass } = Object.fromEntries(formData);

            if (username === '' || password === '' || repeatPass === '') { 
                throw new Error('All fields are required!');
            }

            if (password !== repeatPass) {
                throw new Error('Passwords do not match!');
            }

            await register(username, password);
            ctx.updateNav();
            ctx.page.redirect('/allListings'); 

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}