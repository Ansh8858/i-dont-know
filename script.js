document.addEventListener("DOMContentLoaded", function() {
    // Load chat history from localStorage
    loadChatHistory();

    // Clear chat history every 5 hours (18000 seconds)
    setInterval(clearChatHistory, 18000 * 1000);
});

function startChat() {
    const nameInput = document.getElementById("name-input").value.trim();
    if (nameInput) {
        localStorage.setItem("userName", nameInput);
        document.querySelector(".name-container").style.display = "none";
        document.getElementById("chat-container").style.display = "flex";
        document.getElementById("chat-header").textContent = `${nameInput}'s Chatbox`;
    }
}

function sendMessage() {
    const userName = localStorage.getItem("userName") || "User";
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (message !== "") {
        addMessageToChat(userName, message);
        userInput.value = "";
        // Simulate chatbot response
        setTimeout(() => {
            addMessageToChat("Bot", "You said: " + message);
        }, 500);
    }
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    saveChatHistory();
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveChatHistory() {
    const chatBox = document.getElementById("chat-box");
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function loadChatHistory() {
    const chatHistory = localStorage.getItem("chatHistory");
    const userName = localStorage.getItem("userName");
    if (userName) {
        document.querySelector(".name-container").style.display = "none";
        document.getElementById("chat-container").style.display = "flex";
        document.getElementById("chat-header").textContent = `${userName}'s Chatbox`;
    }
    if (chatHistory) {
        document.getElementById("chat-box").innerHTML = chatHistory;
    }
}

function clearChatHistory() {
    localStorage.removeItem("chatHistory");
    document.getElementById("chat-box").innerHTML = "";
}
