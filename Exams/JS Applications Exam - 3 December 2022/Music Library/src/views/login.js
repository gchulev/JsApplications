import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js'

const loginTemplate = (onLogin) => html`
<!-- Login Page (Only for Guest users) -->
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onLogin}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
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

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/dashboard'); //Check redirection depending on the task

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}