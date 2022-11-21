import { html } from '../../../node_modules/lit-html/lit-html.js';

function homeViewTemplate() {
    return html`
    <section id="home">
        <h1>Welcome to Sole Mates</h1>
        <img src="/exams/Retake Exam - 15 August 2022/images/home.jpg" alt="home" />
        <h2>Browse through the shoe collectibles of our users</h2>
        <h3>Add or manage your items</h3>
    </section>
    `;
}

export function showHomeView(ctx) {
    ctx.renderView(homeViewTemplate);
}