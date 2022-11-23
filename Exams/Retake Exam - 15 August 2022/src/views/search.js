import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../../../node_modules/lit-html/directives/repeat.js';
import { searchItem } from '../../data/data.js';


function searchCardTemplate(item) {
    return html`
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        <li class="card">
            <img src="/exams/Retake Exam - 15 August 2022/${item.imageUrl}" alt="travis" />
            <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
            </p>
            <p>
                <strong>Model: </strong><span class="model">${item.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>
    </ul>`;
}

function searchTemplate(searchResult, user) {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>
    
        <form class="search-wrapper cf" @submit="${search}">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit" >Search</button>
        </form>
        <h3>Results:</h3>
        <div id="search-container" style="display:none">
            ${searchResult
                    ? html`${repeat(searchResult, i => i._id, searchCardTemplate)}`
                    : html`<h2>There are no results found.</h2>`
             }
        </div>
    </section>`;
}

let render = null;

export async function showSearchView(ctx) {
    const result = false;
    render = ctx.renderView;
    const user = JSON.parse(sessionStorage.getItem('userData'));
    ctx.renderView(searchTemplate(result, user))
}

async function search(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const {'search': name} = Object.fromEntries(formData);

    let searchResult = await searchItem(name);
    searchResult = Object.keys(searchResult).length === 0 ? false : searchResult;

    const user = JSON.parse(sessionStorage.getItem('userData'));
    
    document.getElementById('search-container').style.display = 'block';
    render(searchTemplate(searchResult));
    
    if (user) {
        document.querySelector('a.details-btn').style.display = 'block';
    } else {
        document.querySelector('a.details-btn').style.display = 'none';
    }
}

