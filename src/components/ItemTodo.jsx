import React, { useState, useRef } from "react";
import NormalTodoTemplate from "./NormalTodoTemplate.jsx";
import EditTodoTemplate from "./EditTodoTemplate.jsx";

const ItemTodo = ({ content, removeTodo, id, editTodo, setEditId, editId }) => {
  const [isDone, setIsDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const refTodoInside = useRef();
  const refIcons = useRef();

  const onTodoClick = (e) => {
    if (
      refTodoInside.current.contains(e.target) &&
      !refIcons.current.contains(e.target)
    ) {
      setIsDone((prevState) => !prevState);
    }
    if (e.key === "Enter") {
      setIsDone((prevState) => !prevState);
    }
  };

  const editStateOnClick = () => {
    setIsEditing((prevState) => !prevState);
    setIsDone(false);
    setNewTodo(content);
    setEditId(id);
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

  return (
    <>
      {isEditing && editId === id ? (
        <EditTodoTemplate
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          newTodo={newTodo}
          editStateOnClick={editStateOnClick}
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
          refIcons={refIcons}
          refTodoInside={refTodoInside}
        />
      )}
    </>
  );
};

export default ItemTodo;
