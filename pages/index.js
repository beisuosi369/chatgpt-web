import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    setResponse("等待中...");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data.reply);
      } else {
        throw new Error(data.error || "Unknown Error");
      }
    } catch (error) {
      setResponse("错误: " + (error.message || JSON.stringify(error)));
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Liaobo ChatGPT</h1>
      <textarea
        rows="4"
        style={{ width: "100%" }}
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