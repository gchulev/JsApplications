//import './posts.js';
import { displayAllPosts } from './posts.js';

document.querySelector('nav ul li a').addEventListener('click', displayHome);
//document.addEventListener('DOMContentLoaded', displayHome);
displayHome();

async function displayHome () {
    document.querySelector('main').style.display = 'block';
    const themeContent = document.querySelector('div.theme-content');
    if (themeContent !== null) {
        themeContent.remove();
    }
    await displayAllPosts();
    sessionStorage.clear();
}