import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    if (res.ok) {
      setResponse(data.reply);
    } else {
      setResponse("错误: " + (data.error?.message || data.error || "未知错误"));
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Liaobo ChatGPT</h1>
      <textarea
        rows={4}
        cols={60}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>发送</button>
      <h2>AI 回复：</h2>
      <p>{response}</p>
    </div>
  );
}