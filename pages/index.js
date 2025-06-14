import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
      const err = await res.json();
      setReply("错误：" + (err.error || "无法获取响应"));
      return;
    }

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liaobo ChatGPT</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>发送</button>
      <h2>AI 回复：</h2>
      <p>{reply}</p>
    </div>
  );
}
