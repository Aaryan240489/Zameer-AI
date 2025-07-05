async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const userText = userInput.value.trim();
  if (!userText) return;

  // Show user message
  chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
  userInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // API call
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages: [{ role: "user", content: userText }],
    })
  });

  const data = await response.json();
  const botReply = data?.choices?.[0]?.message?.content || "Zameer: कुछ गड़बड़ हो गई है।";

  // Show Zameer reply
  chatBox.innerHTML += `<p><strong>Zameer:</strong> ${botReply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
