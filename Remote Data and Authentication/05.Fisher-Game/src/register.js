document.getElementById('register-form').addEventListener('submit', register);
document.getElementById('home').classList.toggle('active');
document.getElementById('register').classList.toggle('active');
document.getElementById('logout').style.display = 'none';

async function register(e) {
    e.preventDefault();
    const notificationArea = document.querySelector('p.notification');

    try {
        const formData = new FormData(e.target);
        const { password, email, rePass } = Object.fromEntries(formData.entries());

        if (password === '' || email === '' || rePass === '') {
            throw new Error('Cannot submit form! All field shluld be filled in.');
        }

        if (password !== rePass) {
            e.target.elements['password'].value = '';
            e.target.elements['rePass'].value = '';
            throw new Error('Password fields do not match! Please re-enter the password!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, email })
        });
        
        if (response.status === 409) {
            e.target.elements['password'].value = '';
            e.target.elements['rePass'].value = '';
            throw new Error('User already registered!')
        }
        if (response.status !== 200) {
            e.target.elements['password'].value = '';
            e.target.elements['rePass'].value = '';
            throw new Error('Unable to register user!');
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