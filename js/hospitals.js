document.getElementById("findHospitalsBtn").addEventListener("click", function() {
    // Prompt user to allow location access
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showHospitals, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Replace with your actual Google Places API key
const apiKey = '1cc83e5be6a547469b3a6dd2a5789f23'; // Replace with your actual Google API key

function showHospitals(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Call Google Places API to get nearby hospitals
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apiKey}`;
    
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
                <a href="https://www.google.com/maps?q=${hospital.geometry.location.lat},${hospital.geometry.location.lng}" target="_blank">View on Google Maps</a>
            `;
            hospitalsList.appendChild(hospitalItem);
        });
    } else {
        hospitalsList.innerHTML = 'No hospitals found nearby.';
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Location permission is required to find hospitals near you.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
