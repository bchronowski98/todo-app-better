import React, { useState } from "react";
import styles from "./ItemTodo.module.scss";

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
  };

  const handleEdit = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof newTodo === "string" && newTodo) {
      editTodo(e, id, newTodo);
      setNewTodo("");
      setIsEditing(false);
      setIsDone(false);
    }
  };

  const normalTemplate = (
    <div className={styles.todoInside}>
      {content}
      <div>
        <button onClick={editStateOnClick}>edit</button>
        <button onClick={() => removeTodo(id)}>del</button>
      </div>
    </div>
  );

  const editTemplate = (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <div className={styles.todoEditInside}>
        <input
          id={id}
          type="text"
          onChange={handleEdit}
          value={newTodo}
          placeholder="Edit todo..."
          autoFocus={true}
        />
        <div>
          <button type="submit">submit</button>
          <button onClick={editStateOnClick}>cancel</button>
        </div>
      </div>
    </form>
  );

  return (
    <li
      className={`${styles.todo} ${isDone ? styles.todoD : ""}`}
      onClick={onTodoClick}
    >
      {isEditing ? editTemplate : normalTemplate}
    </li>
  );
};

export default ItemTodo;
