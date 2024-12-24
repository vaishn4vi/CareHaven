document.addEventListener('DOMContentLoaded', function() { 
    const chatIcon = document.querySelector('.chat-icon');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');
    const searchInput = document.getElementById('search-bar');
    const subWebsiteBoxes = document.querySelectorAll('.sub-website-box');
    const languageSelect = document.getElementById('language-select');

    // Translations
    const translations = {
        english: {
            about_us: "About Us",
            services: "Services",
            doctors: "Doctors",
            contact_us: "Contact Us",
            hospitals: "Hospitals Around Me",
            women_health: "Women Specific Articles on Healthcare",
            bmi_calculator: "BMI Calculator",
            blood_centers: "Blood Donation & Test Centres",
            personal_reports: "Personal Reports",
            water_tracker: "Water Tracker + Reminder",
            video_tutorials: "Video Tutorials",
            medicines_info: "Medicines Compositions & Allergy Info",
            health_checkups: "Health Checkups",
            doctor_registration: "Doctor Registration",
            book_appointment: "Book an Appointment",
            mental_health: "Mental Health Support and Resources",
            diet_plans: "Personalized Diet Plans"
        },
        हिन्दी: {
            about_us: "हमारे बारे में",
            services: "सेवाएं",
            doctors: "डॉक्टर",
            contact_us: "संपर्क करें",
            hospitals: "मेरे आस-पास के अस्पताल",
            women_health: "महिलाओं के स्वास्थ्य पर विशिष्ट लेख",
            bmi_calculator: "बीएमआई कैलकुलेटर",
            blood_centers: "रक्तदान और परीक्षण केंद्र",
            personal_reports: "व्यक्तिगत रिपोर्ट",
            water_tracker: "जल ट्रैकर + अनुस्मारक",
            video_tutorials: "वीडियो ट्यूटोरियाल",
            medicines_info: "दवाओं की संरचना और एलर्जी जानकारी",
            health_checkups: "स्वास्थ्य जांच",
            doctor_registration: "डॉक्टर पंजीकरण",
            book_appointment: "अपॉइंटमेंट बुक करें",
            mental_health: "मानसिक स्वास्थ्य समर्थन और संसाधन",
            diet_plans: "व्यक्तिगत आहार योजनाएं"
        },
        తెలుగు: {
            about_us: "మా గురించి",
            services: "సేవలు",
            doctors: "డాక్టర్స్",
            contact_us: "మమ్మల్ని సంప్రదించండి",
            hospitals: "నా చుట్టుపక్కల ఆసుపత్రులు",
            women_health: "ఆరోగ్యంపై మహిళలకు ప్రత్యేక వ్యాసాలు",
            bmi_calculator: "బిఎమ్‌ఐ క్యాలిక్యులేటర్",
            blood_centers: "రక్త దానం & పరీక్ష కేంద్రాలు",
            personal_reports: "వ్యక్తిగత నివేదికలు",
            water_tracker: "నీటి ట్రాకర్ + రిమైండర్",
            video_tutorials: "వీడియో ట్యుటోరియల్స్",
            medicines_info: "మందుల సమ్మేళనాలు & అలర్జీ సమాచారం",
            health_checkups: "ఆరోగ్య పరీక్షలు",
            doctor_registration: "డాక్టర్ నమోదు",
            book_appointment: "నియామకం బుక్ చేయండి",
            mental_health: "మనోవ్యాధి మద్దతు మరియు వనరులు",
            diet_plans: "వ్యక్తిగత ఆహార ప్రణాళికలు"
        },
        தமிழ்: {
            about_us: "எங்களை பற்றி",
            services: "சேவைகள்",
            doctors: "மருத்துவர்கள்",
            contact_us: "எங்களை தொடர்பு கொள்ள",
            hospitals: "என் சுற்றுவட்டார மருத்துவமனைகள்",
            women_health: "ஆரோக்கியம் குறித்த பெண்களுக்கு சிறப்பு கட்டுரைகள்",
            bmi_calculator: "பி.எம்.ஐ கணக்கிடுதல்",
            blood_centers: "இரத்த தானம் மற்றும் பரிசோதனை மையங்கள்",
            personal_reports: "தனிப்பட்ட அறிக்கைகள்",
            water_tracker: "நீர்வடிவுக்கோள் + நினைவூட்டல்",
            video_tutorials: "வீடியோ பயிற்சிகள்",
            medicines_info: "மருந்துகளின் கலவைகள் மற்றும் ஒவ்வாமை தகவல்",
            health_checkups: "சுகாதார பரிசோதனைகள்",
            doctor_registration: "மருத்துவர் பதிவு",
            book_appointment: "அபாயிண்ட்‌மேண்ட் பதிவு செய்க",
            mental_health: "மனரோக ஆதரவு மற்றும் வளங்கள்",
            diet_plans: "தனிப்பட்ட உணவுக் கொள்கைகள்"
        },
        deutsch: {
            about_us: "Über uns",
            services: "Dienstleistungen",
            doctors: "Ärzte",
            contact_us: "Kontaktiere uns",
            hospitals: "Krankenhäuser in meiner Nähe",
            women_health: "Spezifische Artikel zur Frauengesundheit",
            bmi_calculator: "BMI Rechner",
            blood_centers: "Blutspende- & Testzentren",
            personal_reports: "Persönliche Berichte",
            water_tracker: "Wasser Tracker + Erinnerung",
            video_tutorials: "Video Tutorials",
            medicines_info: "Zusammensetzung von Medikamenten & Allergie Info",
            health_checkups: "Gesundheitsuntersuchungen",
            doctor_registration: "Arzt Registrierung",
            book_appointment: "Termin buchen",
            mental_health: "Mentale Gesundheitsunterstützung und Ressourcen",
            diet_plans: "Personalisierte Diätpläne"
        }
    };

    // Language selection event listener
    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        applyTranslation(selectedLanguage);
    });

    // Function to apply translation to elements with data-translate attribute
    function applyTranslation(language) {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach((element) => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }

    // Apply default language on load
    applyTranslation(languageSelect.value);
});

  // Open chat box when user clicks on the chat icon
  chatIcon.addEventListener('click', () => {
    chatBox.style.display = 'block';
});

// Close chat box when user clicks the close button
closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

// Send user message when they click the "Send" button
sendMessage.addEventListener('click', () => {
    let message = userInput.value.trim();
    if (message) {
        message = checkSpelling(message); // Check spelling before sending
        addMessageToChat('User', message);  // Display user message in the chat
        userInput.value = '';  // Clear input field

        // Process user message for keywords
        let recognizedKeyword = recognizeKeyword(message);
        if (recognizedKeyword) {
            const responses = healthKeywords[recognizedKeyword];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat('AI Assistant', randomResponse);  // Display random predefined answer
        } else {
            // If no keyword matches, reply with a default message
            addMessageToChat('AI Assistant', 'Sorry, I didn’t understand your message. Please try again.');
        }
    }

    // Open chat box when user clicks on the chat icon
    chatIcon.addEventListener('click', () => {
        chatBox.style.display = 'block';
    });

    // Close chat box when user clicks the close button
    closeChat.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    // Send user message when they click the "Send" button
    sendMessage.addEventListener('click', () => {
        let message = userInput.value.trim();
        if (message) {
            message = checkSpelling(message); // Check spelling before sending
            addMessageToChat('User', message);  // Display user message in the chat
            userInput.value = '';  // Clear input field

            // Process user message for keywords
            let recognizedKeyword = recognizeKeyword(message);
            if (recognizedKeyword) {
                const responses = healthKeywords[recognizedKeyword];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessageToChat('AI Assistant', randomResponse);  // Display random predefined answer
            } else {
                // If no keyword matches, reply with a default message
                addMessageToChat('AI Assistant', 'Sorry, I didn’t understand your message. Please try again.');
            }
        }
    });

    // Function to add message to the chat display
    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;  // Auto-scroll to the latest message
    }

    // Function to compute Levenshtein distance for spell checking
    function levenshteinDistance(str1, str2) {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null)
        );

        for (let i = 0; i <= str1.length; i++) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j++) {
            track[j][0] = j;
        }

        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator // substitution
                );
            }
        }

        return track[str2.length][str1.length];
    }

    // Function to check spelling using Levenshtein distance
    function checkSpelling(message) {
        const possibleWords = Object.keys(healthKeywords);
        let closestWord = message;
        let minDistance = Infinity;

        possibleWords.forEach(word => {
            const distance = levenshteinDistance(message.toLowerCase(), word.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                closestWord = word;
            }
        });

        return minDistance <= 2 ? closestWord : message; // Allow a max distance of 2 for autocorrection
    }

    // Function to recognize a keyword in user message
    function recognizeKeyword(message) {
        const words = message.toLowerCase().split(' ');
        for (let word of words) {
            if (healthKeywords[word]) {
                return word;
            }
        }
        return null;
    }

    // Apply default language on load
    applyTranslation(languageSelect.value);
});