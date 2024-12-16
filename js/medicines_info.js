document.querySelector('.search-btn').addEventListener('click', function () {
    const query = document.querySelector('.search-input').value;

    if (query) {
        // Placeholder for actual medicine search functionality
        alert(`Searching for: ${query}`);
        // Implement API to fetch medicine details, compositions, and allergy info here
    } else {
        alert('Please enter a medicine name or symptom.');
    }
});
