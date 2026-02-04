const API_URL = "https://pk-voice-ai-production-940b.up.railway.app/api/ai";

async function askAI(text) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    console.log(data);
    return data.reply || "No reply";

  } catch (err) {
    console.error("Frontend error:", err);
    return "Server error";
  }
}
