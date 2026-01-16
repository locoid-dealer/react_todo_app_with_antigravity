import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="checkmark"></span>
      </label>
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </div>
  );
};
