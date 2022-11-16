import React, { useState } from "react";
import NormalTodoTemplate from "./NormalTodoTemplate.jsx";
import EditTodoTemplate from "./EditTodoTemplate.jsx";

const ItemTodo = ({ content, removeTodo, id, editTodo, setEditId, editId }) => {
  const [isDone, setIsDone] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const onTodoClick = () => {
    setIsDone((prevState) => !prevState);
  };

  const onTodoKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsDone((prevState) => !prevState);
    }
  };

  const editStateOnClick = () => {
    setIsDone(false);
    setNewTodo(content);
    setEditId(id);
  };

  const cancelStateOnClick = () => {
    setIsDone(false);
    setNewTodo(content);
    setEditId("");
  };

  const handleEdit = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof newTodo === "string" && newTodo) {
      editTodo(id, newTodo);
      setNewTodo("");
      setIsDone(false);
      setEditId("");
    }
  };

  return (
    <>
      {editId === id ? (
        <EditTodoTemplate
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          newTodo={newTodo}
          cancelStateOnClick={cancelStateOnClick}
          id={id}
        />
      ) : (
        <NormalTodoTemplate
          onTodoClick={onTodoClick}
          isDone={isDone}
          content={content}
          editStateOnClick={editStateOnClick}
          removeTodo={removeTodo}
          id={id}
          onTodoKeyDown={onTodoKeyDown}
        />
      )}
    </>
  );
};

export default ItemTodo;
