import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../data/data.js';

function registerTemplate() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>`;
}

let page = null;

export function showRegisterView(ctx) {
    page = ctx.page;
    ctx.renderView(registerTemplate());
    ctx.updateNav();
}

async function onSubmit(event) {
event.preventDefault();
const formData = new FormData(event.target)
const {email, password} = Object.fromEntries(formData);

await registerUser(email, password);
event.target.reset();

page.redirect('/');
}