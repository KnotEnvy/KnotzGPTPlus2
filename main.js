let messages = [];
const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = message.value;
    const newMessage = { role: 'user', content: `${messageText}` };
    messages.push(newMessage);
    message.value = '';
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('message--sent');
    messageElement.innerHTML = `<div class="message__text">${messageText}</div>`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    fetch('http://localhost:4009', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
        messages,
    }),
    })
    .then((res) => res.json())
    .then((data) => {
        let newAssistantMessage = {
        role: 'assistant',
        content: `${data.completion.content}`,
        };
        messages.push(newAssistantMessage);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add('message--received');
        messageElement.innerHTML = `<div class="message__text">${data.completion.content}</div>`;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
// Update temperature and tokens values above sliders
const temperatureSlider = document.getElementById("temperature");
const tokensSlider = document.getElementById("tokens");
const temperatureValue = document.getElementById("temperatureValue");
const tokensValue = document.getElementById("tokensValue");

temperatureSlider.addEventListener("input", () => {
    temperatureValue.textContent = temperatureSlider.value;
});

tokensSlider.addEventListener("input", () => {
    tokensValue.textContent = tokensSlider.value;
});