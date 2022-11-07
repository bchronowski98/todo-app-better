import React, { useState } from "react";
import styles from "./FormTodo.module.scss";

const FormTodo = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof inputValue === "string" && inputValue) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
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
