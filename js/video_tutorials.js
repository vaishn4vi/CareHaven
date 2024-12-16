const API_KEY = 'AIzaSyADieD55OCOpnB8dik2UkU44m7IEpahXNw'; // Replace with your YouTube Data API Key
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const videoResults = document.getElementById('videoResults');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const exerciseTerms = [
        "exercise", "workout", "arms", "abs", "legs", "fitness",
        "cardio", "strength", "yoga", "pilates", "HIIT", "stretching",
        "dumbbell", "kettlebell", "bodyweight", "endurance", "powerlifting", 
        "aerobics", "crossfit", "training", "zumba", "calisthenics", 
        "core", "balance", "weightlifting", "mobility", "gym", 
        "treadmill", "pull ups", "push ups", "jumping", "jacks", "dance", 
        "loss", "belly fat", "thigh", "butt", "glutes", "weight",
        "cardio workout", "ab workout", "full body workout", "home workout",
        "HIIT workout", "strength training", "flexibility", "toning", "stomach"
    ];

    // Check if the query contains any exercise-related terms
    const isExerciseTerm = exerciseTerms.some(term => query.toLowerCase().includes(term));

    if (!isExerciseTerm) {
        alert("Please search for exercise-related terms like 'workout', 'abs', 'fitness', etc.");
        return;
    }

    searchVideos(query);
});

async function searchVideos(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}+exercise&type=video&key=${API_KEY}&maxResults=10`);
        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
        alert('There was an error fetching videos. Please try again later.');
    }
}

function displayVideos(videos) {
    videoResults.innerHTML = '';
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video');
        videoDiv.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
        videoResults.appendChild(videoDiv);
    });
}
