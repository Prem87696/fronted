 const API_URL = "https://pk-voice-ai-production-d933.up.railway.app/api/ai";

// 👉 Text se sawal
function askText() {
  const text = document.getElementById("textInput").value;
  sendQuestion(text);
}

// 👉 Mic se sawal
function startMic() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Mic supported nahi hai");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.start();

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    document.getElementById("textInput").value = spokenText;
    sendQuestion(spokenText);
  };
}

// 👉 Backend ko question bhejna
function sendQuestion(text) {
  document.getElementById("reply").innerText = "Soch raha hoon...";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("reply").innerText = d.reply;
      speak(d.reply);
    });
}

// 👉 AI ka jawab bolkar sunana
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  window.speechSynthesis.speak(speech);
}
