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

    // Get temperature and token count values from sliders
    const temperature = parseFloat(document.getElementById("temperature").value);
    const tokenCount = parseInt(document.getElementById("token-count").value);
    // Log values being sent to server
    console.log(`Sending temperature: ${temperature}, tokenCount: ${tokenCount}`);
    fetch('http://localhost:4009', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            messages,
            temperature,
            tokenCount,

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

// Update temperature and token count values above sliders
const temperatureSlider = document.getElementById("temperature");
const tokenCountSlider = document.getElementById("token-count");
const temperatureValue = document.getElementById("temperature-value");
const tokenCountValue = document.getElementById("token-count-value");

temperatureSlider.addEventListener("input", () => {
    temperatureValue.textContent = temperatureSlider.value;
});

tokenCountSlider.addEventListener("input", () => {
    tokenCountValue.textContent = tokenCountSlider.value;
});

// Add event listener to "Save Context" button
const saveContextBtn = document.getElementById("save-context-btn");
const systemPromptInput = document.getElementById("system-prompt");

saveContextBtn.addEventListener("click", () => {
    const systemPrompt = systemPromptInput.value;

    fetch('http://localhost:4009/save-context', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            systemPrompt
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Get existing botPurpose button
const botPurposeBtn = document.getElementById('botPurpose');

// Get modal overlay
const modal = document.getElementById('bot-personalities-modal');

// Open modal when button clicked
botPurposeBtn.addEventListener('click', () => {
  modal.style.display = 'block';
})

// Close modal
const closeBtn = document.getElementById('close-modal');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
})
// Get chosen personality
const personalities = document.querySelectorAll('.personality');


personalities.forEach(btn => {
  btn.addEventListener('click', () => {

    const name = btn.dataset.name;
    
    // Call API to update
    fetch('/update-personality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name}) 
    })
    .then(res => {
      modal.style.display = 'none';
      // Update sliders
    temperatureSlider.value = personality.temperature; 
    tokenSlider.value = personality.tokens;

    // Show notification 
    showNotification(`Personality changed to ${name}!`);
    
    // Change avatar image
    // avatarImg.src = `${name}.png`;

    // Update displayed prompt
    promptText.innerText = personality.prompt;
    

    })

  })
})
// Display notification
function showNotification(text) {

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = text;
  
    chatContainer.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000);
  
  }
  
  // Get references
//   const avatarImg = document.querySelector('.avatar');
  const promptText = document.querySelector('.prompt-text');
