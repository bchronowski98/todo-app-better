import React, { useState } from "react";

const ItemTodo = ({ content }) => {
  const [isDone, setIsDone] = useState(false);

  function onTodoClick() {
    console.log(content);
    setIsDone((state) => !state);
  }

  return (
    <li
      onClick={onTodoClick}
      style={{ textDecoration: isDone ? "line-through" : "" }}
    >
      {content}
    </li>
  );
};

export default ItemTodo;
