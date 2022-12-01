import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { showNotification } from './notification.js';

const registerTemplate = (onRegister) => html`
<!-- Register Page ( Only for guest users ) -->
<section id="register">
    <form id="register-form" @submit=${onRegister}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export async function showRegisterView(ctx) {
    ctx.renderView(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const { username, email, password, repeatPass, gender } = Object.fromEntries(formData);

            if (username === '' || email === '' || password === '' || repeatPass === '') { // Check if the form fields are named the same!!!
                throw new Error('All fields are required!');
            }

            if (password !== repeatPass) {
                throw new Error('Passwords do not match!');
            }

            await register({ username, email, password, gender });
            ctx.updateNav();
            ctx.page.redirect('/allMemes'); // Check the task description to where to redirect!!!

        } catch (error) {
            showNotification(error.message);
            throw error;
        }
    }
}