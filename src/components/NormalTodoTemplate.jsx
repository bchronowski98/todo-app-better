import React from "react";
import styles from "./ItemTodo.module.scss";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Del } from "../assets/delete.svg";

const NormalTodoTemplate = ({
  isDone,
  content,
  onTodoClick,
  editStateOnClick,
  removeTodo,
  id,
  onTodoKeyDown,
}) => {
  return (
    <li
      className={`${styles.todo} ${isDone ? styles.todoD : ""}`}
      onClick={onTodoClick}
      onKeyDown={onTodoKeyDown}
      tabIndex="0"
    >
      <div className={styles.todoInside}>
        {content}
        <div className={styles.statusButtons}>
          <h5>{isDone ? "Complete" : "Pending"}</h5>
          <div className={styles.icons}>
            <button type="button" onClick={editStateOnClick}>
              <Edit />
            </button>
            <button type="button" onClick={() => removeTodo(id)}>
              <Del />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default NormalTodoTemplate;
