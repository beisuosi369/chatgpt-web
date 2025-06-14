export default function Home() {
  return (
    <div>
      <h1>Liaobo ChatGPT</h1>
      <form method="POST" onSubmit={async (e) => {
        e.preventDefault();
        const input = e.target.elements.input.value;
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        alert(data.reply);
      }}>
        <textarea name="input" rows="3" style={{ width: "300px" }} />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}