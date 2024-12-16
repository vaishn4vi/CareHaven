document.getElementById('getStarted').addEventListener('click', function () {
    document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('signinForm').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
});

document.getElementById('showSignIn').addEventListener('click', function() {
    document.getElementById('signinForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
});


function displayError(message) {
    const errorMessageContainer = document.getElementById('errorMessage');
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.display = 'block';
}

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('signupUsername').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;

    fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Proceed if response is OK
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            console.log('Sign In Data:', data); // Log the data to ensure it's correct
            window.location.href = '/sub-websites/therapy.html'; // Redirect after successful login
        })
        .catch(error => {
            displayError(error.message); // Display error if it occurs
        });
});

// Handle Sign In
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('signinEmail').value;
    let password = document.getElementById('signinPassword').value;

    fetch('/api/v1/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Proceed if response is OK
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            console.log('Sign In Data:', data); // Log the data to ensure it's correct

            // Set login status in localStorage after successful login
            localStorage.setItem('userLoggedIn', 'true');

            // Redirect after successful login
            window.location.href = '/sub-websites/therapy.html';
        })
        .catch(error => {
            displayError(error.message); // Display error if it occurs
        });
});