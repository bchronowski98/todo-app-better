import React from "react";
import ItemTodo from "./ItemTodo.jsx";

const ListTodo = ({ todos }) => {
  const reversed = todos.slice().reverse();

  return (
    <ul>
      {reversed.map((todo, index) => {
        return <ItemTodo key={index} content={todo} />;
      })}
    </ul>
  );
};

export default ListTodo;
