import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserTheaters } from '../api/data.js'
import { getUserData } from '../util.js';


const userEventTemplate = (userEvent) => html`
<!--If there are event-->
<div class="eventBoard">
    <div class="event-info">
        <img src="${userEvent.imageUrl}">
        <h2>${userEvent.title}</h2>
        <h6>${userEvent.date}</h6>
        <a href="/details/${userEvent._id}" class="details-button">Details</a>
    </div>
</div>`;

const profileTemplate = (user, userEvents) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${userEvents.length > 0
        ? html`${userEvents.map(ev => userEventTemplate(ev))}`
        : html`
        <!--If there are no event-->
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
    </div>
</section>`;

export async function showProfileView(ctx) {
    const user = await getUserData();
    const userEvents = await getUserTheaters(user._id);

    ctx.renderView(profileTemplate(user, userEvents));
}