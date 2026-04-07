import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      priority,
      completed: false,
    });

    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Thêm công việc</h2>

      <input
        type="text"
        placeholder="Nhập tên công việc"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Thêm</button>
    </form>
  );
}