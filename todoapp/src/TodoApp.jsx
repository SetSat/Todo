import React, { useState } from "react";
import "./todoapp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (taskName, description) => {
    const newTodo = {
      id: todos.length + 1,
      taskName,
      description,
      status: "Not Completed",
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === "Completed" ? "Not Completed" : "Completed",
            }
          : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <TodoItem
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              toggleStatus={toggleStatus}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(taskName, description);
    setTaskName("");
    setDescription("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const TodoItem = ({ todo, deleteTodo, updateTodo, toggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(todo.taskName);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateTodo(todo.id, {
      ...todo,
      taskName: editedTaskName,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{todo.taskName}</h3>
          <p>{todo.description}</p>
          <p>
            <strong>Status:</strong> {todo.status}
          </p>
          <div className="todo-actions">
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="toggle-button"
              onClick={() => toggleStatus(todo.id)}
            >
              Toggle Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
