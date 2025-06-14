import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div>
      <h1>Liaobo ChatGPT</h1>
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
      <p>{response}</p>
    </div>
  );
}
