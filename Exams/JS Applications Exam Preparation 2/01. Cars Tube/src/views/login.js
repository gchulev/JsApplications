import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js'

const loginTemplate = (onLogin) => html`
<!-- Login Page -->
<section id="login">
    <div class="container">
        <form id="login-form" action="jsavscript:void(0)" method="post" @submit=${onLogin}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function showLoginView(ctx) {
    ctx.renderView(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { username, password } = Object.fromEntries(formData);

            if (username === '' || password === '') {
                throw new Error('All fields are required!');
            }

            await login(username, password);
            ctx.updateNav();
            ctx.page.redirect('/allListings'); 

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}