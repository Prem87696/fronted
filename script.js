const API = "pk-voice-ai-production-940b.up.railway.app/api/ai"; // Railway से copy किया हुआ exact domain

function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "hi-IN"; // Hindi
  speechSynthesis.speak(u);
}

async function ask(){
  const text = document.getElementById("txt").value.trim();
  if(!text) return;
  document.getElementById("log").innerText = "Thinking…";

  try{
    const r = await fetch(API,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ text })
    });
    const d = await r.json();
    document.getElementById("log").innerText = d.reply || "No reply";
    speak(d.reply || "");
  }catch(e){
    document.getElementById("log").innerText = "Error: " + e.message;
  }
}

// 🎤 Mic (Speech-to-Text)
function mic(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ alert("Speech Recognition not supported"); return; }
  const rec = new SR();
  rec.lang = "hi-IN";
  rec.onresult = e=>{
    const said = e.results[0][0].transcript;
    document.getElementById("txt").value = said;
    ask();
  };
  rec.start();
}
