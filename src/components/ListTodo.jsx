import React from "react";
import ItemTodo from "./ItemTodo.jsx";
import styles from "./ListTodo.module.scss";

const ListTodo = ({ todos, setTodos }) => {
  const reversed = todos.slice().reverse();

  return (
    <ul className={styles.lista}>
      {reversed.map((todo) => {
        return (
          <ItemTodo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            todoList={reversed}
            setTodos={setTodos}
          />
        );
      })}
    </ul>
  );
};

export default ListTodo;
