import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const root = document.querySelector('article');
root.innerHTML = '';

const showTowns = (towns) =>
   html`
   <div id="towns">
      <ul>
         ${towns.map(town => html`<li>${town}</li>`)}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click=${search}>Search</button>
   <div id="result"></div>
`;

function search() {
   const searchBoxValue = this.parentElement.querySelector('input#searchText').value;
   let matchesCounter = 0;

   const liItems = Array.from(document.querySelectorAll('ul li'));

   for (const item of liItems) {
      const itemValue = item.textContent;
      if (searchBoxValue !== '') {
         if (itemValue.includes(searchBoxValue)) {
            item.style.textDecoration = 'underline';
            item.style.fontWeight = 'bold';
            item.classList.add('active');
            matchesCounter++;
         } else {
            item.style.textDecoration = 'none';
            item.style.fontWeight = '';
            item.classList.remove('active');
         }
      } else {
         item.style.textDecoration = 'none';
         item.style.fontWeight = '';
         item.classList.remove('active');
      }
   }

   document.getElementById('result').textContent = `${matchesCounter} matches found`;
}
render(showTowns(towns), root);


