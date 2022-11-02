import React from "react";
import ItemTodo from "./ItemTodo.jsx";
import styles from "./ListTodo.module.scss";

const ListTodo = ({ todos }) => {
  const reversed = todos.slice().reverse();

  return (
    <ul className={styles.lista}>
      {reversed.map((todo, index) => {
        return <ItemTodo key={index} content={todo} />;
      })}
    </ul>
  );
};

export default ListTodo;
