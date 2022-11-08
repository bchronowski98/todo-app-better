import React, { useState } from "react";
import styles from "./ItemTodo.module.scss";
import { ReactComponent as Del } from "../assets/delete.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Xsign } from "../assets/x-sign.svg";
import { ReactComponent as Ok } from "../assets/ok.svg";

const ItemTodo = ({ content, removeTodo, id, editTodo }) => {
  const [isDone, setIsDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const onTodoClick = () => {
    setIsDone((state) => !state);
  };

  const editStateOnClick = (e) => {
    e.stopPropagation();
    setIsEditing((prevState) => !prevState);
    setIsDone(false);
    setNewTodo(content);
  };

  const handleEdit = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof newTodo === "string" && newTodo) {
      editTodo(id, newTodo);
      setNewTodo("");
      setIsEditing(false);
      setIsDone(false);
    }
  };

  const normalTemplate = (
    <li
      className={`${styles.todo} ${isDone ? styles.todoD : ""}`}
      onClick={onTodoClick}
    >
      <div className={styles.todoInside}>
        {content}
        <div className={styles.statusButtons}>
          <h5>{isDone ? "Complete" : "Pending"}</h5>
          <div className={styles.icons}>
            <button onClick={editStateOnClick}>
              <Edit />
            </button>
            <button onClick={() => removeTodo(id)}>
              <Del />
            </button>
          </div>
        </div>
      </div>
    </li>
  );

  const editTemplate = (
    <li className={styles.todo}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <div className={styles.todoEditInside}>
          <input
            id={id}
            type="text"
            onChange={handleEdit}
            value={newTodo}
            placeholder="Edit todo..."
            autoFocus={true}
            maxLength="20"
          />
          <div className={styles.editButtons}>
            <button type="submit">
              <Ok />
            </button>
            <button onClick={editStateOnClick}>
              <Xsign />
            </button>
          </div>
        </div>
      </form>
    </li>
  );

  return <>{isEditing ? editTemplate : normalTemplate}</>;
};

export default ItemTodo;
