
// Login functionality
document.getElementById('btn-login').addEventListener('click' , () => {
    const userName = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // logic
    if(userName === 'admin' && pass === 'admin123'){
        window.location.assign('Home.html');
    }
});
