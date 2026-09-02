/* CareHaven — simple rule-based health-info chat assistant (client-side only) */
(function () {
  var KB = {
    water: ["Most adults benefit from around 30–35 ml of water per kg of body weight daily. Check out the Water Tracker to set a personalized goal and log your intake.", "Feeling thirsty, tired or having a headache can be early signs of dehydration. Try the Water Tracker to build a steady habit."],
    bmi: ["BMI is a quick screening measure using your height and weight — it doesn't capture muscle mass or body composition. Try the BMI Calculator to see your number and track it over time.", "You can calculate your BMI and see your history in the BMI Calculator section."],
    sleep: ["Most adults need 7–9 hours of sleep a night. Keeping a consistent sleep and wake time helps a lot.", "A wind-down routine — dim lights, no screens, consistent bedtime — can meaningfully improve sleep quality."],
    stress: ["Short breathing exercises, short walks, and journaling can help in the moment. The Mental Health page has a mood tracker and a guided breathing exercise.", "It can help to name what's stressing you out and break it into smaller steps. Visit the Mental Health page for tools and resources."],
    diet: ["Balanced meals with protein, fiber and healthy fats keep energy steady. Try the Diet Plans page for a plan based on your preferences.", "Check out the Diet Plans section for meal ideas that match your dietary preferences and calorie needs."],
    appointment: ["You can book an appointment with an available doctor on the Book Appointment page.", "Head to Book an Appointment to pick a doctor, date and time."],
    hospital: ["The Hospitals Around Me page can help you find nearby hospitals, using your location or a curated list.", "Try Hospitals Around Me to search hospitals by city."],
    medicine: ["The Medicines Info page has composition, common uses and allergy warnings for common medicines. Always confirm dosing with a pharmacist or doctor.", "You can look up medicine info on the Medicines Info page."],
    period: ["The Women's Health section has articles about menstrual health, common symptoms and when to see a doctor.", "Check the Women's Health page for more on this."],
    exercise: ["The Video Tutorials page has guided workouts for different fitness levels.", "A mix of cardio and strength training a few times a week is a solid general starting point — see Video Tutorials for guided routines."]
  };

  var GREETINGS = ["hi", "hello", "hey", "yo", "hola"];

  function levenshtein(a, b) {
    var m = [];
    for (var i = 0; i <= b.length; i++) m[i] = [i];
    for (var j = 0; j <= a.length; j++) m[0][j] = j;
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        m[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
      }
    }
    return m[b.length][a.length];
  }

  function findTopic(message) {
    var words = message.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
    var keys = Object.keys(KB);
    for (var i = 0; i < words.length; i++) {
      if (KB[words[i]]) return words[i];
    }
    // fuzzy match single-word-ish messages
    var best = null, bestDist = 3;
    words.forEach(function (w) {
      keys.forEach(function (k) {
        var d = levenshtein(w, k);
        if (d < bestDist) { bestDist = d; best = k; }
      });
    });
    return best;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var chatIcon = document.getElementById("chatIcon");
    var chatBox = document.getElementById("chatBox");
    var closeChat = document.getElementById("closeChat");
    var sendMessage = document.getElementById("sendMessage");
    var userInput = document.getElementById("userInput");
    var chatContent = document.getElementById("chatContent");
    if (!chatIcon || !chatBox) return;

    function addMessage(who, text) {
      var wrap = document.createElement("div");
      wrap.className = "chat-msg " + (who === "You" ? "user" : "bot");
      var whoEl = document.createElement("div");
      whoEl.className = "who";
      whoEl.textContent = who;
      var textEl = document.createElement("div");
      textEl.textContent = text;
      wrap.appendChild(whoEl);
      wrap.appendChild(textEl);
      chatContent.appendChild(wrap);
      chatContent.scrollTop = chatContent.scrollHeight;
    }

    var greeted = false;
    chatIcon.addEventListener("click", function () {
      var open = chatBox.classList.toggle("open");
      if (open && !greeted) {
        greeted = true;
        addMessage("CareHaven Assistant", "Hi! Ask me about water intake, BMI, sleep, stress, diet, appointments, hospitals, medicines or exercise.");
      }
    });
    closeChat.addEventListener("click", function () { chatBox.classList.remove("open"); });

    function handleSend() {
      var message = userInput.value.trim();
      if (!message) return;
      addMessage("You", message);
      userInput.value = "";

      var lower = message.toLowerCase();
      if (GREETINGS.indexOf(lower.replace(/[^a-z]/g, "")) !== -1) {
        addMessage("CareHaven Assistant", "Hello! What would you like to know about — water, BMI, sleep, stress, diet, appointments, hospitals or medicines?");
        return;
      }
      var topic = findTopic(message);
      if (topic) {
        var responses = KB[topic];
        addMessage("CareHaven Assistant", responses[Math.floor(Math.random() * responses.length)]);
      } else {
        addMessage("CareHaven Assistant", "I'm a simple assistant and don't have an answer for that yet — but you can explore the tools in the menu above, or ask about water, BMI, sleep, stress, diet, appointments, hospitals or medicines. For medical concerns, please consult a healthcare professional.");
      }
    }

    sendMessage.addEventListener("click", handleSend);
    userInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") handleSend();
    });
  });
})();
