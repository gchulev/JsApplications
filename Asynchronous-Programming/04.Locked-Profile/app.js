function lockedProfile() {
    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(response => response.ok = true ? response.json() : 'Error')
        .then(createUserCards)
        .catch(/*implement error handling here */);

    function createUserCards(data) {
        document.getElementById('main').innerHTML = '';

        const dataElements = Array.from(Object.values(data));
        const userCards = dataElements.map(elm => {

            // Creating user cards
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');

            const img = document.createElement('img');
            img.setAttribute('src', './iconProfile2.png');
            img.classList.add('userIcon');

            const labelLock = document.createElement('label');
            labelLock.textContent = 'Lock';

            const lockInput = document.createElement('input');
            lockInput.setAttribute('type', 'radio');
            lockInput.setAttribute('name', 'user1Locked');
            lockInput.setAttribute('value', 'lock');
            lockInput.checked = true;

            const labelUnlock = document.createElement('label');
            labelUnlock.textContent = 'Unlock';

            const unlockInput = document.createElement('input');
            unlockInput.setAttribute('type', 'radio');
            unlockInput.setAttribute('name', 'user1Locked');
            unlockInput.setAttribute('value', 'unlock');

            const br = document.createElement('br');

            const hr = document.createElement('hr');

            const labelUserName = document.createElement('label');
            labelUserName.textContent = 'Username';

            const userNameInput = document.createElement('input');
            userNameInput.setAttribute('type', 'text');
            userNameInput.setAttribute('name', 'user1Username');
            userNameInput.setAttribute('value', `${elm.username}`); // Setting username value
            userNameInput.disabled = true;
            userNameInput.readOnly = true;

            const hiddenDiv = document.createElement('div');
            hiddenDiv.setAttribute('id', 'user1HiddenFields');
            hiddenDiv.style.display = 'none';

            const hr2 = document.createElement('hr');

            const labelEmail = document.createElement('label');
            labelEmail.textContent = 'Email:';

            const emailInput = document.createElement('input');
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('name', 'user1Email');
            emailInput.setAttribute('value', `${elm.email}`); // Setting email
            emailInput.disabled = true;
            emailInput.readOnly = true;

            const labelAge = document.createElement('label');
            labelAge.textContent = 'Age:';

            const inputAge = document.createElement('input');
            inputAge.setAttribute('type', 'email');
            inputAge.setAttribute('name', 'user1Age');
            inputAge.setAttribute('value', `${elm.age}`); // Setting age/
            inputAge.disabled = true;
            inputAge.readOnly = true;

            const showMoreBtn = document.createElement('button');
            showMoreBtn.textContent = 'Show more';
            showMoreBtn.addEventListener('click', showMoreInfo);

            // Appending card elements to their parents
            profileDiv.appendChild(img);
            profileDiv.appendChild(labelLock);
            profileDiv.appendChild(lockInput);
            profileDiv.appendChild(labelUnlock);
            profileDiv.appendChild(unlockInput);
            profileDiv.appendChild(br);
            profileDiv.appendChild(hr);
            profileDiv.appendChild(labelUserName);
            profileDiv.appendChild(userNameInput);
            profileDiv.appendChild(hiddenDiv);

            hiddenDiv.appendChild(hr2);
            hiddenDiv.appendChild(labelEmail);
            hiddenDiv.appendChild(emailInput);
            hiddenDiv.appendChild(labelAge);
            hiddenDiv.appendChild(inputAge);

            profileDiv.appendChild(showMoreBtn);

            return profileDiv;

        });
        document.getElementById('main').replaceChildren(...userCards);
    }

    function showMoreInfo() {
        //const lockInput = this.parentElement.querySelector('input[type="radio"][value="lock"]')
        const unlockInput = this.parentElement.querySelector('input[type="radio"][value="unlock"]');
        if (unlockInput.checked === true) {
            if (this.parentElement.querySelector('div#user1HiddenFields').style.display === 'none') {
                this.parentElement.querySelector('div#user1HiddenFields').style.display = 'block';
                this.textContent = 'Hide it';
            } else {
                this.parentElement.querySelector('div#user1HiddenFields').style.display = 'none';
                this.textContent = 'Show more';
            }
        }
    }
}