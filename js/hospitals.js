document.getElementById("findHospitalsBtn").addEventListener("click", function() {
    // Always try to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showHospitals, showDefaultHospitals);
    } else {
        alert("Geolocation is not supported by this browser.");
        showDefaultHospitals(); // Show hospitals even if geolocation is not available
    }
});

function showHospitals(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Call Google Places API to get nearby hospitals
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=1cc83e5be6a547469b3a6dd2a5789f23`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayHospitals(data.results);
        })
        .catch(error => {
            alert('Error fetching hospitals data.');
            console.error(error);
        });
}

function showDefaultHospitals() {
    // If location is denied or unavailable, show a default set of hospitals in Chennai
    const defaultHospitals = [
        { name: "Apollo Hospital", vicinity: "Greams Road, Chennai", rating: 4.3, lat: 13.0565, lng: 80.2670 },
        { name: "Fortis Malar Hospital", vicinity: "Adyar, Chennai", rating: 4.2, lat: 13.0081, lng: 80.2601 },
        { name: "MIOT International", vicinity: "Manapakkam, Chennai", rating: 4.5, lat: 12.9894, lng: 80.1984 },
        { name: "Sri Ramachandra Medical Centre", vicinity: "Porur, Chennai", rating: 4.1, lat: 13.0396, lng: 80.1831 },
        { name: "Madras Medical Mission", vicinity: "Mogappair, Chennai", rating: 4.0, lat: 13.0684, lng: 80.1909 },
        { name: "Government General Hospital", vicinity: "Park Town, Chennai", rating: 3.8, lat: 13.0789, lng: 80.2785 },
        { name: "St. Isabel's Hospital", vicinity: "Mylapore, Chennai", rating: 4.0, lat: 13.0494, lng: 80.2590 },
        { name: "Rajiv Gandhi Government General Hospital", vicinity: "Egmore, Chennai", rating: 3.9, lat: 13.0870, lng: 80.2781 },
        { name: "Kaveri Medical Center", vicinity: "Chetpet, Chennai", rating: 3.9, lat: 13.0632, lng: 80.2360 },
        { name: "Vijaya Hospital", vicinity: "Vadapalani, Chennai", rating: 4.2, lat: 13.0590, lng: 80.2223 }
    ];

    displayHospitals(defaultHospitals);
}

function displayHospitals(hospitals) {
    const hospitalsList = document.getElementById("hospitalsList");
    hospitalsList.innerHTML = ''; // Clear previous results

    if (hospitals.length > 0) {
        hospitals.forEach(hospital => {
            const hospitalItem = document.createElement('div');
            hospitalItem.classList.add('hospital-item');
            hospitalItem.innerHTML = `
                <strong>${hospital.name}</strong><br>
                ${hospital.vicinity}<br>
                Rating: ${hospital.rating || 'N/A'} <br>
                <a href="https://www.google.com/maps?q=${hospital.lat},${hospital.lng}" target="_blank">View on Google Maps</a>
            `;
            hospitalsList.appendChild(hospitalItem);
        });
    } else {
        hospitalsList.innerHTML = 'No hospitals found nearby.';
    }
}
