import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("Todo App", () => {
  it("renders the title and empty state initially", () => {
    render(<App />);
    expect(screen.getByText("Just Do It.")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("No tasks yet. Add one above!")
    ).toBeInTheDocument();
  });

  it("allows adding a new todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Type and submit
    await user.type(input, "Buy milk");
    expect(addButton).toBeEnabled();
    await user.click(addButton);

    // Check if added
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    // Input should be cleared
    expect(input).toHaveValue("");
    // Empty state should be gone
    expect(
      screen.queryByText("No tasks yet. Add one above!")
    ).not.toBeInTheDocument();
  });

  it("prevents adding empty todos", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add/i });

    expect(addButton).toBeDisabled();

    await user.type(input, "   ");
    expect(addButton).toBeDisabled();

    await user.keyboard("{Enter}");

    // Still empty state
    expect(
      screen.getByText("No tasks yet. Add one above!")
    ).toBeInTheDocument();
  });

  it("toggles todo completion status", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add todo
    await user.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "Exercise"
    );
    await user.click(screen.getByRole("button", { name: /add/i }));

    const checkbox = screen.getByRole("checkbox");
    const todoItem = screen.getByText("Exercise").closest(".todo-item");

    expect(checkbox).not.toBeChecked();
    expect(todoItem).not.toHaveClass("completed");

    // Toggle
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass("completed");

    // Toggle back
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(todoItem).not.toHaveClass("completed");
  });

  it("deletes a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add todo
    await user.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "Clean room"
    );
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Clean room")).toBeInTheDocument();

    // Delete
    const deleteBtn = screen.getByLabelText("Delete todo");
    await user.click(deleteBtn);

    expect(screen.queryByText("Clean room")).not.toBeInTheDocument();
    expect(
      screen.getByText("No tasks yet. Add one above!")
    ).toBeInTheDocument();
  });
});
