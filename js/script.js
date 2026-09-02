document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.querySelector('.chat-icon');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');

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
            addMessageToChat('User', message);  // Display user message in the chat
            userInput.value = '';  // Clear input field

            // Send message to AI for health-related response
            sendToWit(message);
        }
    });

    // Function to add message to the chat display
    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;  // Auto-scroll to the latest message
    }

    // Function to send the message to the Wit.ai API
    async function sendToWit(message) {
        try {
            const response = await fetch(`https://api.wit.ai/message?v=20231019&q=${encodeURIComponent(message)}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer NMMEZ4N2R7YAILHTOIQH6YKIDTDOGVUB',  // Replace with your Wit.ai access token
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            const intent = data.entities && data.entities.intent && data.entities.intent[0]?.value;

            // Customize responses based on recognized intent
            let aiMessage = '';
            switch (intent) {
                case 'symptom_check':
                    aiMessage = "Could you please describe your symptoms in detail?";
                    break;
                case 'health_advice':
                    aiMessage = "What specific health advice are you looking for?";
                    break;
                case 'medication_info':
                    aiMessage = "Can you provide the name of the medication you have questions about?";
                    break;
                default:
                    aiMessage = "I'm not quite sure how to help with that. Can you provide more details?";
                    break;
            }

            addMessageToChat('AI Assistant', aiMessage);  // Display AI's response in the chat

        } catch (error) {
            // In case of an error, display an error message
            addMessageToChat('AI Assistant', 'Sorry, something went wrong. Please try again later.');
        }
    }
});
