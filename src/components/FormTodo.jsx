import React from "react";

const FormTodo = ({ inputValue, setInputValue, todos, setTodos }) => {
  function onAddTaskHandler(e) {
    e.preventDefault();
    if (inputValue) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  }

  return (
    <form onSubmit={onAddTaskHandler}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="Add task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default FormTodo;
