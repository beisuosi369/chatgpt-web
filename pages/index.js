import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setChat([...chat, { role: "user", content: input }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setChat((prev) => [...prev, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>💬 Liaobo ChatGPT</h2>
      <div>
        {chat.map((msg, i) => (
          <p key={i}><b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}</p>
        ))}
      </div>
      <textarea
        rows={3}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}