import React, { useState } from "react";
import NormalTodoTemplate from "./NormalTodoTemplate.jsx";
import EditTodoTemplate from "./EditTodoTemplate.jsx";

const ItemTodo = ({
  content,
  removeTodo,
  id,
  editTodo,
  setEditId,
  editId,
  done,
  changeDone,
}) => {
  const [newTodo, setNewTodo] = useState("");

  const onTodoClick = () => {
    changeDone(id, !done);
    console.log(done);
  };

  const onTodoKeyDown = (e) => {
    if (e.key === "Enter") {
      changeDone(id, !done);
    }
  };

  const editStateOnClick = (e) => {
    e.stopPropagation();
    changeDone(id, false);
    setNewTodo(content);
    setEditId(id);
  };

  const cancelStateOnClick = () => {
    changeDone(id, false);
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
      changeDone(id, false);
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
          isDone={done}
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
