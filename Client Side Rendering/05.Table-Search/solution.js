import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { classMap } from '../../node_modules/lit-html/directives/class-map.js';

const root = document.querySelector('tbody');

const rowTemplate = (item) => html`
   <tr .id=${item._id} class=${item.active ? classMap({ select: 'select'  }) : nothing}>
      <td>${item.firstName} ${item.lastName}</td>
      <td>${item.email}</td>
      <td>${item.course}</td>
   </tr>
   `;

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   let items = await getItems();
   items = await loadItems(items);

   async function onClick() {
      const searchTextField = this.parentElement.querySelector('#searchField');

      clearElements(items);

      setActiveIfSearchFound(items, searchTextField.value);

      render(items.map(i => rowTemplate(i)), root);

      searchTextField.value = '';
   }
}

async function loadItems(itemsToLoad) {
   itemsToLoad = itemsToLoad.map(i => Object.assign({}, i, { active: false }));
   render(itemsToLoad.map(i => rowTemplate(i)), root);
   return itemsToLoad;
}

async function getItems() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data = await response.json();
   return Object.values(data);
}

function setActiveIfSearchFound(itemsArray, searchText) {
   if (searchText !== '') {
      for (const item of itemsArray) {
         const searchProps = [item.course, item.email, item.firstName, item.lastName];
         
         for (const propValue of searchProps) {
            if (propValue.toString().toLowerCase().includes(searchText.toLowerCase())) {
               item.active = true;
            }
         }
      }
   }
}

function clearElements(itemsArr) {
   for (const item of Object.values(itemsArr)) {
      item.active = false;
   }
}

solve();