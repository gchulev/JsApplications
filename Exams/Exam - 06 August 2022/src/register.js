import { html } from '../../../node_modules/lit-html/lit-html.js';
import { register } from '../data/data.js';

const registerTemplate = () => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit="${registerUser}">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

let page = null;
let context = null;

export async function showRegisterView(ctx) {
    page = ctx.page;
    context = ctx;
    ctx.renderView(registerTemplate());
}

async function registerUser(e) {
    try {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password, 're-password': repass } = Object.fromEntries(formData);

        if (email === '' || password === '' || repass === '') {
            throw new Error('Fields can not be empty!');
        }
        if (password !== repass) {
            throw new Error('Password do not match!');
        }

        const userData = await register(email, password);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        context.updateNav();
        page.redirect('/dashboard');

    } catch (error) {
        alert(error.message);
    }
}