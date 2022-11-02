import React from "react";
import styles from "./FormTodo.module.scss";

const FormTodo = ({ inputValue, setInputValue, todos, setTodos }) => {
  function onAddTaskHandler(e) {
    e.preventDefault();
    if (inputValue) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  }

  return (
    <form className={styles.main} onSubmit={onAddTaskHandler}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="Type your task..."
      />

      <button type="submit">add task</button>
    </form>
  );
};

export default FormTodo;
