// Sign Up functionality
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    alert("Registration successful! Please sign in.");
});

// Sign In functionality
document.getElementById("signinForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert(`Welcome back, ${storedUser.username}!`);
    } else {
        alert("Invalid email or password.");
    }
});

// Parallax Effect on Scroll
window.addEventListener("scroll", function () {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});
