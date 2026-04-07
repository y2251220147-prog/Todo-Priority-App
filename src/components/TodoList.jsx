export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className="card">
      <h2>Danh sách công việc</h2>

      {todos.length === 0 ? (
        <p>Chưa có công việc nào.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div>
                <strong>{todo.title}</strong>
                <p>
                  Priority: {todo.priority} | Status:{" "}
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div className="todo-actions">
                <button onClick={() => onToggle(todo.id)}>
                  {todo.completed ? "Bỏ hoàn thành" : "Hoàn thành"}
                </button>
                <button className="delete-btn" onClick={() => onDelete(todo.id)}>
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}