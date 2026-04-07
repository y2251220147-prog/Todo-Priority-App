const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
};

export function validateTodo(todo) {
  if (!todo || typeof todo !== "object") {
    throw new Error("Todo must be an object");
  }

  if (!todo.title || todo.title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!["high", "medium", "low"].includes(todo.priority)) {
    throw new Error("Invalid priority");
  }

  return true;
}

export function addTodo(list, todo) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  validateTodo(todo);
  return [...list, todo];
}

export function toggleTodoStatus(list, id) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  return list.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function filterTodos(list, status) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  if (status === "completed") {
    return list.filter((todo) => todo.completed);
  }

  if (status === "pending") {
    return list.filter((todo) => !todo.completed);
  }

  return list;
}

export function sortTodosByPriority(list) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  return [...list].sort(
    (a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
  );
}

export function getTodoStats(list) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  const completed = list.filter((todo) => todo.completed).length;
  const total = list.length;

  return {
    total,
    completed,
    pending: total - completed,
  };
}

export function removeTodo(list, id) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  return list.filter((todo) => todo.id !== id);
}