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
        placeholder="Add your task..."
        maxLength="20"
      />

      <button tabIndex="1" type="submit">
        +
      </button>
    </form>
  );
};

export default FormTodo;
