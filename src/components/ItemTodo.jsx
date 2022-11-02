import React, { useState } from "react";
import styles from "./ItemTodo.module.scss";

const ItemTodo = ({ content, onClickDel }) => {
  const [isDone, setIsDone] = useState(false);

  function onTodoClick() {
    setIsDone((state) => !state);
  }
  function onClickEdit(e) {
    e.stopPropagation();
    console.log("Tu bedzie edit?");
  }

  return (
    <li className={isDone ? styles.itemD : styles.itemN} onClick={onTodoClick}>
      <div className={styles.test}>
        {content}
        <div className="buttons">
          <button onClick={onClickEdit}>EDIT</button>
          <button onClick={onClickDel}>DEL</button>
        </div>
      </div>
    </li>
  );
};

export default ItemTodo;
