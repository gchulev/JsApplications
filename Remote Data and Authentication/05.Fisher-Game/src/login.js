document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('home').classList.toggle('active');
document.getElementById('login').classList.toggle('active');
document.getElementById('logout').style.display = 'none';

async function onLogin(event) {
    event.preventDefault();

    const notificationArea = document.querySelector('p.notification');

    try {
        const formData = new FormData(event.target);
        const { email, password } = Object.fromEntries(formData.entries());

        if (email === '') {
            throw new Error('Email can not be empty!');
        }

        if (password === '') {
            throw new Error('Password can not be empty!');
        }
        
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status !== 200) {
            throw new Error('Cannot login! Wrong user name or password')
        }

        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userName', data.email);

        window.location = './index.html';

    } catch (error) {
        notificationArea.textContent = error.message;
    }
}


