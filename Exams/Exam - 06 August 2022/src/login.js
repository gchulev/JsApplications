import { html } from '../../../node_modules/lit-html/lit-html.js';
import { login } from '../data/data.js';

const loginTemplate = () => html`
<!-- Login Page (Only for Guest users) -->
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit="${loginUser}">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

let page = null;
let context = null;

export async function showLoginView(ctx) {
    page = ctx.page;
    context = ctx;
    ctx.renderView(loginTemplate());

}

async function loginUser(e) {
    try {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        if (email === '' || password === '') {
            throw new Error('Invalid e-mail or password!');
        }
        
        const result = await login(email, password);
        sessionStorage.setItem('userData', JSON.stringify(result));
        context.updateNav();
        page.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}