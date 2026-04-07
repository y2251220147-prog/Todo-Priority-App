import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import {
  addTodo,
  filterTodos,
  getTodoStats,
  removeTodo,
  sortTodosByPriority,
  toggleTodoStatus,
} from "./utils/todoUtils";
import "./App.css";

const initialTodos = [
  { id: 1, title: "Học React", priority: "high", completed: false },
  { id: 2, title: "Làm bài lab GitHub", priority: "medium", completed: true },
  { id: 3, title: "Viết test", priority: "high", completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  function handleAdd(todo) {
    setTodos((prev) => addTodo(prev, todo));
  }

  function handleToggle(id) {
    setTodos((prev) => toggleTodoStatus(prev, id));
  }

  function handleDelete(id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      setTodos((prev) => removeTodo(prev, id));
    }
  }

  const displayedTodos = useMemo(() => {
    let filtered = filterTodos(todos, filter);
    if (priorityFilter !== "all") {
      filtered = filtered.filter((todo) => todo.priority === priorityFilter);
    }
    return sortTodosByPriority(filtered);
  }, [todos, filter, priorityFilter]);

  const stats = useMemo(() => getTodoStats(todos), [todos]);

  return (
    <div className="app-container">
      <h1>Todo Priority App</h1>
      <p>Ứng dụng ReactJS dùng để thực hành GitHub Flow, Test và CI.</p>

      <TodoForm onAdd={handleAdd} />

      <div className="filter-group">
        <div className="filter-box">
          <label>Lọc trạng thái: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="pending">Chưa hoàn thành</option>
          </select>
        </div>

        <div className="filter-box">
          <label>Lọc độ ưu tiên: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <TodoStats stats={stats} />
      <TodoList
        todos={displayedTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}