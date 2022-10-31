function solution() {
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(response => response.ok === true ? response.json() : 'Error')
        .then(processData)
        .catch();

    function processData(data) {
        const items = Object.values(data).map(item => {
            // Creating card elements for each item.
            const accordionDiv = document.createElement('div');
            accordionDiv.classList.add('accordion');

            const headDiv = document.createElement('div');
            headDiv.classList.add('head');

            const headSpan = document.createElement('span');
            headSpan.textContent = item.title; //item title goes here

            const moreBtn = document.createElement('button');
            moreBtn.classList.add('button');
            moreBtn.setAttribute('id', `${item._id}`); // set element Id here
            moreBtn.textContent = 'More';
            moreBtn.addEventListener('click', showInfo);

            const extraDiv = document.createElement('div');
            extraDiv.classList.add('extra');
            extraDiv.style.display = 'none';

            const extraP = document.createElement('p');
            
            // Appending elements to their parents
            accordionDiv.appendChild(headDiv);
            headDiv.appendChild(headSpan);
            headDiv.appendChild(moreBtn);

            accordionDiv.appendChild(extraDiv);
            extraDiv.appendChild(extraP);

            return accordionDiv;

        });
        document.getElementById('main').replaceChildren(...items);
    }

    function showInfo() {
        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${this.id}`)
        .then(response => response.ok === true ? response.json() : 'Error')
        .then(data => {
            if (this.parentElement.parentElement.querySelector('div[class="extra"]').style.display === 'none') {
                this.parentElement.parentElement.querySelector('div[class="extra"]').children[0].textContent = data.content;
                this.parentElement.parentElement.querySelector('div[class="extra"]').style.display = 'block';
                this.textContent = 'Less';
            } else {
                this.parentElement.parentElement.querySelector('div[class="extra"]').style.display = 'none';
                this.textContent = 'More';
            }
        })
        .catch();
    }
}

solution();