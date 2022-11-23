import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../../data/data.js';

function loginTemplate() {
    return html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onSubmit}>
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    </section>`;
}

let innerPage = null;
let context = null;

export function showLoginVew(ctx) {
    innerPage = ctx.page;
    context = ctx;
    ctx.renderView(loginTemplate());
    ctx.updateNav();
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (email === '' || password === '') {
        window.alert('Username or password can not be empty!')
    } else {
        const userData = await loginUser(email, password);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        context.updateNav();
        innerPage.redirect('/dashboard');
    }
}