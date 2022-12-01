import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { showNotification } from './notification.js';


const loginTemplate = (onLogin) => html`
<!-- Login Page ( Only for guest users ) -->
<section id="login">
    <form id="login-form" @submit=${onLogin}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/create">Sign up</a>.</p>
            </div>
        </div>
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

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/allMemes'); //Check redirection depending on the task

        } catch (error) {
            showNotification(error.message);
            throw error;
        }
    }
}