import React, { useState } from "react";

const FormTodo = ({ inputValue, onInputValueChange }) => {
  return (
    <form>
      <input
        onChange={(e) => onInputValueChange(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="Add task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default FormTodo;
