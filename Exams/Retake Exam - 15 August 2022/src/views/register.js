import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../../data/data.js';

function registerTemplate() {
    return html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit=${regusterUser}>
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">login</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`;
}

let page = null;
let context = null;

export async function showRegisterView(ctx) {
    page = ctx.page;
    context = ctx;
    ctx.renderView(registerTemplate())
    ctx.updateNav();
}

async function regusterUser(evt) {
    try {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);
        const { email, password, 're-password': rePass } = data;

        if (email === '') {
            throw new Error('Email can not be empty!');
        }
        if (password === '') {
            throw new Error('Password can not be empty!');
        }
        if (password !== rePass) {
            throw new Error('Password do not match!');
        }

        const user = await registerUser(email, password);
        sessionStorage.setItem('userData', JSON.stringify(user));
        
        context.updateNav();
        page.redirect('/dashboard');

    } catch (error) {
        alert(error);
        throw error;
    }
}