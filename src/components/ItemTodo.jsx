import React, { useState } from "react";
import styles from "./ItemTodo.module.scss";

const ItemTodo = ({ content, removeTodo, id }) => {
  const [isDone, setIsDone] = useState(false);

  const onTodoClick = () => {
    setIsDone((state) => !state);
  };

  return (
    <li
      className={`${styles.todo} ${isDone ? styles.todoD : styles.todoN}`}
      onClick={onTodoClick}
    >
      <div className={styles.todoInside}>
        {content}
        <div className="buttons">
          <button>EDIT</button>
          <button onClick={() => removeTodo(id)}>DEL</button>
        </div>
      </div>
    </li>
  );
};

export default ItemTodo;
