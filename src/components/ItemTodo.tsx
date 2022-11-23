import React, { SyntheticEvent, useState } from "react";
import NormalTodoTemplate from "./NormalTodoTemplate";
import EditTodoTemplate from "./EditTodoTemplate.tsx";

interface ItemTodoInterface {
  content: string;
  removeTodo: any;
  id: string;
  editTodo: any;
  setEditId: any;
  editId: any;
  isDone: boolean;
  changeDone: any;
}

const ItemTodo: React.FC<ItemTodoInterface> = ({
  content,
  removeTodo,
  id,
  editTodo,
  setEditId,
  editId,
  isDone,
  changeDone,
}) => {
  const [newTodo, setNewTodo] = useState("");

  const onTodoClick = () => {
    changeDone(id, !isDone);
    console.log(isDone);
  };

  const onTodoKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      changeDone(id, !isDone);
    }
  };

  const editStateOnClick = (e: MouseEvent) => {
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

  const handleEdit = (e: any) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (newTodo) {
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
