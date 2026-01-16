import { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
};
