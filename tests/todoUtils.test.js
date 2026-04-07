import { describe, test, expect } from "vitest";
import {
  validateTodo,
  addTodo,
  toggleTodoStatus,
  filterTodos,
  sortTodosByPriority,
  getTodoStats,
  removeTodo,
} from "../src/utils/todoUtils";

describe("todoUtils", () => {
  const sampleTodos = [
    { id: 1, title: "Task A", priority: "medium", completed: false },
    { id: 2, title: "Task B", priority: "high", completed: true },
    { id: 3, title: "Task C", priority: "low", completed: false },
  ];

  test("validateTodo should accept valid todo", () => {
    expect(
      validateTodo({
        id: 1,
        title: "Learn Vitest",
        priority: "high",
        completed: false,
      })
    ).toBe(true);
  });

  test("validateTodo should throw if title is empty", () => {
    expect(() =>
      validateTodo({
        id: 1,
        title: "",
        priority: "high",
        completed: false,
      })
    ).toThrow();
  });

  test("addTodo should add new todo", () => {
    const newTodo = {
      id: 4,
      title: "Task D",
      priority: "medium",
      completed: false,
    };

    const result = addTodo(sampleTodos, newTodo);

    expect(result).toHaveLength(4);
    expect(result[3].title).toBe("Task D");
  });

  test("toggleTodoStatus should change completed state", () => {
    const result = toggleTodoStatus(sampleTodos, 1);
    expect(result[0].completed).toBe(true);
  });

  test("filterTodos should return completed todos", () => {
    const result = filterTodos(sampleTodos, "completed");
    expect(result).toHaveLength(1);
  });

  test("sortTodosByPriority should put high first", () => {
    const result = sortTodosByPriority(sampleTodos);
    expect(result[0].priority).toBe("high");
  });

  test("getTodoStats should return correct stats", () => {
    const result = getTodoStats(sampleTodos);

    expect(result).toEqual({
      total: 3,
      completed: 1,
      pending: 2,
    });
  });

  test("removeTodo should remove todo by id", () => {
    const result = removeTodo(sampleTodos, 1);
    expect(result).toHaveLength(2);
    expect(result.find((todo) => todo.id === 1)).toBeUndefined();
  });
});